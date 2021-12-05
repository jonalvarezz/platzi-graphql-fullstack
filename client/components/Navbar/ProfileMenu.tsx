import type { ReactNode } from 'react'
import Image from 'next/image'

import { useCurrentUser } from '@store/Auth'

function ProfileMenu() {
  const { user, status } = useCurrentUser()

  let MenuName: ReactNode = null

  if (status !== 'success') {
    /* Placeholder para evitar layout shifts */
    MenuName = <span className="ml-2 inline-block w-16" />
  } else {
    if (user != null) {
      MenuName = <span className="ml-2">{user.username}</span>
    } else {
      MenuName = <span className="ml-2">Ingresar</span>
    }
  }

  return (
    <div className="flex items-center">
      <Image
        width={34}
        height={34}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAC61BMVEUAAAC0qK6ysLyjoLDu3Nz/vJOysLzFubb/05aysbyysLyurLn74p+ysL2zsLyzsLytrLn4sYf/3KGtrbe6s7aysLz745//v4j74p+ysbyppbSysL2zsbyysbywr7qzsb2rqLn84qDvoIb74p//v4mysLykobGlobGlorKmo7Ono7KysLyysbyopbX/vYeppbX5vIutqrf74qD3q4f/xpLzuYyzsLz74p+npLT74p6npLP83qGopLOysbyppLSysLyysbz84p/845+xsLv+yo7/w5Gqqrb/4532y5ftm4P74qD+0qT/vYbtm4P2ypamo7H2wpPtm4Omo7L/vYb+0qSno7Ptm4Ono7P/vYanpLT64qD84qC5srj745/645//vob84qD905mjoLD5vIrdspaysLz74Z/nuZb/xJD74qCupa7/xpOysLvtm4L90aTtm4P/0aX/x5XumYTsnIT+0qSysLz74p/tm4Ohna7/vYb/iZdCPk/2xpT3zJein6/+0aSsqbf+0KHdw6+SfXOwrrv80aX+zZz/v4imorL+xqL93KH/i5e3sru0sbvjxq3vzKn+ypm/trn60Kb/kJj/jZj/yZb/xZH+vYe7tLm5srmpprXYwbD+wqH+vaDkvJj/w43/wIvLu7XKurXFs67oyKuqoav+zqP+z5//pp30vI/JqYz1z6f916P+y6P+yKL83qH+tZ/+sp7et5z/n5v/m5v5wpr/k5jxvZP0sI/7v42mjXxvYWNZUFngxK2mn63qyau5paT7zqHtxKH+uqDSs6D/rJ7/rp3/l5rSrpn/lZnuuZHmtZDIqIz/uoi4moSXgXXTv7LNtamtoqm/qqXat6DCqaDxyJ7/opzqw5vowJrrvJb3t5HSr5D/qI/NrI78vYihY3N7ZWhhV11VRlZOR1RGQlG8srW2p6i7qKe3paXVs5/YsJfsvZXXtJPWs5L/uZD/npDfjI3/q4zdi4y4nIWuk4Cskn+IdG6HdG67cxG8AAAAdHRSTlMABO75AQb5/gzdXRbx1tHAUxUQDQn94MS+s5iThnk4Licf/vj18+3r4sXAtqiOeF1PQDYsI/3m5baypIB4cm5qZF9aQ0I8Hhf49fTw8O7s5uLi2NjNzMS7sKynloxza11XM/Pw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"
        alt=""
      />
      {MenuName}
    </div>
  )
}

export default ProfileMenu
