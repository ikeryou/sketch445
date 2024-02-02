import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _item: Array<HTMLElement> = []

  private _size: number = 200
  public get size(): number {
    return this._size
  }
  
  constructor(opt:any) {
    super(opt)

    this.addClass('js-rect')

    for(let i = 0; i < 4; i++) {
      let item
      if(i % 2 != 0) {
        item = document.createElement('input') as HTMLInputElement
        item.type = Util.randomArr(['radio', 'checkbox'])
        item.checked = Util.hit(2)
      } else {
        item = document.createElement('div')
      }

      item.classList.add('js-rect-item')
      this.useGPU(item)

      this.el.appendChild(item)
      this._item.push(item)
    }

    this._resize()
  }

  public setSize(size:number, itA:number, itB:number, upd: boolean):void {
    Tween.set(this.el, {
      width: size,
      height: size * 0.5,
      scale: 1.0001
    })

    this._item.forEach((item, i) => {
      let itemSize = size
      if(i === 1) {
        itemSize -= size * itA
      }
      if(i === 2) {
        itemSize -= size * itA + size * itB
      }
      if(i === 3) {
        itemSize -= size * itA + size * itB + size * itA
      }

      if(upd && (item as any).checked !== undefined) {
        (item as any).checked = Util.hit(2)
      }

      Tween.set(item, {
        width: itemSize,
        height: itemSize,
        x: size * 0.5 - itemSize * 0.5,
        y: size * 0.5 - itemSize * 0.5,
      })
    })
  }

  protected _update():void {
    super._update()
  }

  protected  _resize(): void {
    super._resize()
  }
}







