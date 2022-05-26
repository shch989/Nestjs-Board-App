// https://github.com/typestack/class-validator#manual-validation 파이프 관련 github
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateBoardDto } from 'src/dto/create-board.dto';
import { Board, BoardStatus } from './board.model';
import { BoardsService } from './boards.service';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}
  // CRUD 에서의 R
  @Get('/')
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }
  // C 기능 controller
  @Post()
  @UsePipes(ValidationPipe) // pipe 유효성 체크
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto);
  }
  // 특정 게시물 R controller
  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }
  // 특정 게시물 D controller
  // 게시물을 지우는 것이기에 따로 return은 하지 않겠음
  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardsService.deleteBoard(id);
  }
  // U 기능 controller
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
