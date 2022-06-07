/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from 'src/dto/create-board.dto';
import { BoardRepository } from './board.repositoty';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,){}
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  // // CRUD에서의 C
  // createBoard(createBoardDto: CreateBoardDto): Board {
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title: title,
  //     description: description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }
  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user)
  }
  // // CRUD에서의 특정 게시물 R
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`${id}라는 아이디는 존재하지 않습니다.`); // 찾지 못할 경우 Not Found 출력
  //   }
  //   return found;
  // }
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`${id}라는 아이디는 존재하지 않습니다.`)
    }
    return found;
  }
  // // CRUD에서의 특정 게시물 D
  // deleteBoard(id: string): void {
  //   // 사용자가 입력한 아이디가 없는데 게시물을 지우려 할 때 결과 값 처리
  //   // R 부분의 if문을 통해 Not Found가 출력됨
  //   const found = this.getBoardById(id);
  //   // boards에는 filter를 통해 id가 다른 것만 남기겠다.
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }
  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({id, user});
    if(result.affected === 0) {
      throw new NotFoundException(`${id}라는 이름의 게시물을 찾지 못했습니다`)
    }
    console.log('result', result);
  }
  // // CRUD에서의 U
  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }
  // CRUD 에서 모든 게시물을 가져오는 기능
  async getAllBoards(user: User): Promise<Board[]> {
    // 해당 유저가 생성한 게시물만 출력
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });
    const boards = await query.getMany();
    return boards;
  }
}
