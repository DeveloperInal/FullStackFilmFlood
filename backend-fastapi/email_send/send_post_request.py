from fastapi import APIRouter
from .code_send_email import email_sender

router = APIRouter(tags=['EmailService'], prefix='/api/v1')

async def send_email(user_email: str):
    code = await email_sender.send_code_to_email(user_email)
    return code


async def compration(verify_code: int):
    is_valid = await email_sender.compare_code(verify_code)
    if is_valid:
        return True
    else:
        return False

@router.post('/send_email')
async def send_email_code(email: str):
    code = await send_email(user_email=email)
    return code

@router.post('/verify_code')
async def verify_code(code: int):
    is_valid = await compration(verify_code=code)
    if is_valid:
        return True
    else:
        return False