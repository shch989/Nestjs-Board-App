import { Injectable, NotFoundException } from '@nestjs/common';
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
    const found = this.boards.find((board) => board.id === id);
    if (!found) {
      throw new NotFoundException(`${id}라는 아이디는 존재하지 않습니다.`); // 찾지 못할 경우 Not Found 출력
    }
    return found;
  }
  // CRUD에서의 특정 게시물 D
  deleteBoard(id: string): void {
    // 사용자가 입력한 아이디가 없는데 게시물을 지우려 할 때 결과 값 처리
    // R 부분의 if문을 통해 Not Found가 출력됨
    const found = this.getBoardById(id);
    // boards에는 filter를 통해 id가 다른 것만 남기겠다.
    this.boards = this.boards.filter((board) => board.id !== found.id);
  }
  // CRUD에서의 U
  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
