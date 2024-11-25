#!/bin/bash

# Увеличиваем vm.max_map_count
sudo sysctl -w vm.max_map_count=1677720
echo "vm.max_map_count=1677720" | sudo tee -a /etc/sysctl.conf

# Уменьшаем swappiness
sudo sysctl -w vm.swappiness=1
echo "vm.swappiness=1" | sudo tee -a /etc/sysctl.conf

# Изменяем настройки transparent_hugepage
echo 'never' | sudo tee /sys/kernel/mm/transparent_hugepage/enabled
echo 'never' | sudo tee /sys/kernel/mm/transparent_hugepage/defrag
echo "echo never > /sys/kernel/mm/transparent_hugepage/enabled" | sudo tee -a /etc/rc.local
echo "echo never > /sys/kernel/mm/transparent_hugepage/defrag" | sudo tee -a /etc/rc.local

# Перезагружаем систему
sudo reboot