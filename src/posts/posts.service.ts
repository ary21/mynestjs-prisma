import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post, Prisma } from '@prisma/client';
import { PostQuery } from './dto/post-query';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {
    prisma.$on<any>('query', (event: Prisma.QueryEvent) => {
      console.log('Query: ' + event.query);
      console.log('Duration: ' + event.duration + 'ms');
    });
  }

  async post(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async posts(params: PostQuery): Promise<Post[]> {
    // cursor ==> https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination
    const {
      skip,
      take,
      title,
      content,
      published,
      authorName,
      orderBy,
      orderWith,
    } = params;
    let order: Prisma.PostOrderByWithRelationInput = { id: 'desc' };
    if (orderBy === 'title') {
      order = { title: orderWith === 'asc' ? 'asc' : 'desc' };
    }

    let where: Prisma.PostWhereInput = {};
    if (title || content || authorName) {
      where = {
        ...where,
        OR: [
          { title: { contains: title, mode: 'insensitive' } },
          {
            content: { contains: content, mode: 'insensitive' },
          },
          {
            author: {
              OR: [
                { name: { contains: authorName, mode: 'insensitive' } },
                { email: { contains: authorName, mode: 'insensitive' } },
              ],
            },
          },
        ],
      };
    }

    if (published) {
      where.published = true;
    }

    return this.prisma.post.findMany({
      where,
      skip: skip ? +skip : undefined,
      take: take ? +take : undefined,
      orderBy: order,
      include: {
        author: true,
      },
    });
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { data, where } = params;
    return this.prisma.post.update({
      data,
      where,
    });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    });
  }
}
