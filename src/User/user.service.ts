import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: data,
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new HttpException('User not Found', HttpStatus.NOT_FOUND);

    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new HttpException('User not Found', HttpStatus.NOT_FOUND);

    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new HttpException('User not Found', HttpStatus.NOT_FOUND);

    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
