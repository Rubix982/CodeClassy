import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './create.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(
    __teacherEmail: string,
    __requestBody: CreateCategoryDTO,
  ) {
    try {
      const category = this.categoryRepository.create({
        createdBy: __teacherEmail,
        name: __requestBody.name,
      });
      await this.categoryRepository.save(category);
      return category;
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException([
          `Category already present with name: ${__requestBody.name}`,
        ]);
      }
    }
  }

  async getCategories(__teacherEmail: string) {
    const categories = await this.categoryRepository.find({
      where: { createdBy: __teacherEmail },
    });

    return categories;
  }
}
