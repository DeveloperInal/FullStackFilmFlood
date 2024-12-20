// EmailVerification
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EmailService {
    async sendEmail(email: string) { // Функция отправки кода на почту
        const sendUrl = 'http://0.0.0.0:8000/api/v1/send_email?email=';
        const email_post = await axios.post(`${sendUrl}${email}`);
        return email_post.data;
    }

    async compration_code(code: number): Promise<boolean> { // Функия проверки кода
        const comprationUrl = 'http://0.0.0.0:8000/api/v1/verify_code?code=';
        const response = await axios.post(`${comprationUrl}${code}`);
        return response.data === true;
    }
}
