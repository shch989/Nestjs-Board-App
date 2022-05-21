import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from 'src/dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];
  getAllBoards(): Board[] {
    return this.boards;
  }
  // CRUD에서의 C
  createBoard(createBoardDto: CreateBoardDto): Board {
    const { title, description } = createBoardDto;

    const board: Board = {
      id: uuid(),
      title: title,
      description: description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }
  // CRUD에서의 특정 게시물 R
  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }
  // CRUD에서의 특정 게시물 D
  deleteBoard(id: string): void {
    // boards에는 filter를 통해 id가 다른 것만 남기겠다.
    this.boards = this.boards.filter((board) => board.id !== id);
  }
  // CRUD에서의 U
  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
