import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { hashPassword } from '../common/utils/hash.util';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userData: Partial<User>): Promise<User> {
    const hashedPassword = await hashPassword(userData.password);
    const newUser = new this.userModel({ ...userData, password: hashedPassword });
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password');
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateData: Partial<User>): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    const result = await this.userModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('User not found');
    return { deleted: true };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) return null;

    const isMatch = await user.comparePassword(password);
    return isMatch ? user : null;
  }
}
