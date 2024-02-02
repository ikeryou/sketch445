import { Func } from "../core/func";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Item } from "./item";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _line: number = 12
  private _item:Array<Item> = []

  constructor(opt:any) {
    super(opt)

    for(let i = 0; i < this._line * this._line; i++) {
      const item = document.createElement('div')
      item.classList.add('js-item')
      this.el.appendChild(item)

      this._item.push(new Item({
        el: item,
      }))
    }

    // Tween.set(this.el, {
    //   rotationZ: 45,
    // })

    this._resize()
  }


  protected _update():void {
    super._update()

    const sw = Func.sw()
    const sh = Func.sh()

    const radius = sw * 0.05
    const itA = 0.2
    const itB = 0.4

    this._item.forEach((item,i) => {
      item.setSize(radius * 2, itA, itB, this._c % 10 === 0)

      const ix = i % this._line
      const iy = Math.floor(i / this._line)

      const it2 = (radius * 2 - radius * 1 * itA)
      let x = it2 * ix
      let y = radius * 1 * -iy

      let rot = 180

      if(iy % 2 != 0) {
        x -= radius - (radius - radius * itA - radius * itB) * 1
        rot = 0
      }

      // x += it2 * this._line * 0.5
      y += radius * 0.75 * this._line * 0.5

      Tween.set(item.el, {
        x: sw * 0.5 + x - sw * 0.5,
        y: sh * 0.5 + y + item.size * 0.25,
        rotationZ: rot,
      })
    })
  }

  protected  _resize(): void {
  }
}