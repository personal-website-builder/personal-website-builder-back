import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SaveUserDetailsCommand } from '../application/save-user-details/save-user-details.command';
import { UserIdExistPipe } from './pipes/user-id-exist.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync, readdirSync, unlinkSync } from 'fs';
import { SaveUserDetailAvatarCommand } from '../application/save-user-detail-avatar/save-user-detail-avatar.command';
import { SaveUserDetailCoverCommand } from '../application/save-user-detail-cover/save-user-detail-cover.command';
import { UserDetailExistPipe } from './pipes/user-detail-exist.pipe';
import { FindUserDetailsQuery } from '../application/find-user-details/find-user-details.query';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id/details')
  async findDetailsByUserId(
    @Param('id', ParseUUIDPipe, UserIdExistPipe, UserDetailExistPipe)
    id: string,
  ) {
    const query = new FindUserDetailsQuery();
    query.userId = id;
    return this.queryBus.execute(query);
  }

  @Patch(':id/details')
  async saveDetails(
    @Param('id', ParseUUIDPipe, UserIdExistPipe) id: string,
    @Body() command: SaveUserDetailsCommand,
  ) {
    command.userId = id;
    return this.commandBus.execute(command);
  }

  @Post(':id/avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const userId = req.params.id;
          const uploadPath = `./src/public/${userId}/images/detail`;

          // Crear el directorio si no existe
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }

          const files = readdirSync(uploadPath);

          files
            .filter((file) => file.startsWith('avatar'))
            .forEach((file) => {
              try {
                unlinkSync(join(uploadPath, file));
              } catch (err) {
                console.error(`Error al eliminar el archivo ${file}:`, err);
              }
            });

          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const ext = extname(file.originalname);
          const filename = `avatar${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async saveUserDetailAvatar(
    @Param('id', ParseUUIDPipe, UserIdExistPipe, UserDetailExistPipe)
    id: string,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    console.log(id);
    console.log(avatar);
    const filePath = avatar.path.slice(avatar.path.indexOf('/public'));
    const command = new SaveUserDetailAvatarCommand();
    command.userId = id;
    command.avatar = filePath;
    return this.commandBus.execute(command);
  }

  @Post(':id/cover')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const userId = req.params.id;
          const uploadPath = `./src/public/${userId}/images/detail`;

          // Crear el directorio si no existe
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }

          const files = readdirSync(uploadPath);

          files
            .filter((file) => file.startsWith('cover'))
            .forEach((file) => {
              unlinkSync(join(uploadPath, file));
            });

          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const ext = extname(file.originalname);
          const filename = `cover${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async saveUserDetailCover(
    @Param('id', ParseUUIDPipe, UserIdExistPipe, UserDetailExistPipe)
    id: string,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    const filePath = avatar.path.slice(avatar.path.indexOf('/public'));
    const command = new SaveUserDetailCoverCommand();
    command.userId = id;
    command.cover = filePath;
    return this.commandBus.execute(command);
  }
}
