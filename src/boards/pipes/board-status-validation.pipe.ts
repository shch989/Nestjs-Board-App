import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];
  transform(value: any, metadata: ArgumentMetadata) {
    // console.log('value', value);
    // console.log('metadata', metadata);
    value = value.toUpperCase(); // 소문자가 입력되어도 대문자로 변환 PRIVATE, PUBLIC
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(
        `${value}의 옵션은 존재하지 않는 값입니다.`,
      );
    }
    return value;
  }
  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
