import { IsNotEmpty } from 'class-validator';
export class CreateBoardDto {
  @IsNotEmpty() // 파일이 없으면 에러가 발생(유효성 체크)
  title: string;
  @IsNotEmpty()
  description: string;
}
