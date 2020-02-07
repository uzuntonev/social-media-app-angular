import { Pipe, PipeTransform } from '@angular/core';
import { IPost } from 'src/app/shared/models/post';

@Pipe({
  name: 'likeDislike',
  pure: true
})
export class LikeDislikePipe implements PipeTransform {

  transform(post: IPost): any {
    return null
  }

}
