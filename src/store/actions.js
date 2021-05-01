import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
  addCart(context, payload) {
    // 查找之前是否有改商品
    let oldProduct = null;
    for (let item of context.state.cartList) {
      if (item.iid === payload.iid) {
        oldProduct = item;
      }
    }
    //判断
    if (oldProduct) {
      // oldProduct.count += 1;
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1;
      // context.state.cartList.push(payload);
      context.commit(ADD_TO_CART, payload)
    }

  }
}