import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostQuery } from './dto/post-query';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost({
      title: createPostDto.title,
      content: createPostDto.content,
      author: {
        connect: { email: createPostDto.authorEmail },
      },
    });
  }

  @Get()
  findAll(@Query() query: PostQuery) {
    return this.postsService.posts(query);
  }

  @Get('by-author')
  findAllByAuthor(@Query() query: PostQuery) {
    const { authorName } = query;
    return this.postsService.posts({ authorName });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.post({ id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost({
      where: { id: +id },
      data: updatePostDto,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.postsService.deletePost({ id: +id });
  }
}
