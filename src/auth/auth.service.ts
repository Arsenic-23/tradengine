import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '@/modules/users/users.service';
import { compareHash, hashPassword } from '@/common/utils/hash.util';
import { JwtPayload, JwtResponse } from './types/jwt.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signup(signupDto: SignupDto): Promise<JwtResponse> {
    const hashedPassword = await hashPassword(signupDto.password);
    const user = await this.usersService.createUser({
      ...signupDto,
      password: hashedPassword,
    });

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);
    return {
      accessToken: token,
      user,
    };
  }

  async login(loginDto: LoginDto): Promise<JwtResponse> {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await compareHash(loginDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);
    return {
      accessToken: token,
      user,
    };
  }
}
