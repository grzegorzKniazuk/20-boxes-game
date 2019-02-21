import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';

export class OutletUrlSerializer extends DefaultUrlSerializer implements UrlSerializer {
  serialize(tree: UrlTree): string {
    return super.serialize(tree).replace(/\(board:board\/\/edit:edit(\/\d+)?\)/g, '');
  }
}
