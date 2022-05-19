import { Controller, Get } from '@nestjs/common';
import { Board } from './board.model';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}
  // CRUD 에서의 R
  @Get('/')
  getAllBoards(): Board[] {
    return this.boardsService.getAllBoards();
  }
}
