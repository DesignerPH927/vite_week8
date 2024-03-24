<template>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header bg-warning">
          <h1 class="modal-title fs-5 text-white" id="exampleModalLabel">
            檢視資訊
          </h1>
          <button type="button" class="btn-close"
            data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <ul class="nav nav-tabs row" id="myTab" role="tablist">
            <li class="nav-item  col-md-6 " role="presentation">
              <button class="nav-link active w-100 text-dark" id="home-tab"
                data-bs-toggle="tab" data-bs-target="#clientData"
                type="button" role="tab" aria-controls="clientData"
                aria-selected="true">
                用戶資料
              </button>
            </li>
            <li class="nav-item col-md-6" role="presentation">
              <button class="nav-link w-100 text-dark" id="profile-tab"
                data-bs-toggle="tab" data-bs-target="#orderProduct"
                type="button" role="tab" aria-controls="orderProduct"
                aria-selected="false">
                選購商品
              </button>
            </li>
            <li class="nav-item col-md-6" role="presentation">
              <button class="nav-link w-100 text-dark" id="profile-tab"
                data-bs-toggle="tab" data-bs-target="#orderDetail"
                type="button" role="tab" aria-controls="orderDetail"
                aria-selected="false">
                訂單細節
              </button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="clientData"
              role="tabpanel" aria-labelledby="home-tab">
              <div class="card my-4 mx-auto">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table align-middle text-center">
                      <tbody v-if="tempOrderData.user">
                        <tr>
                          <th>姓名</th>
                          <td>{{tempOrderData.user.name}}</td>
                        </tr>
                        <tr>
                          <th>信箱</th>
                          <td>{{tempOrderData.user.email}}</td>
                        </tr>
                        <tr>
                          <th>電話</th>
                          <td>{{ tempOrderData.user.tel }}</td>
                        </tr>
                        <tr>
                          <th>地址</th>
                          <td>{{ tempOrderData.user.address }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="orderProduct"
              role="tabpanel" aria-labelledby="profile-tab">
              <div class="card my-4 mx-auto">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table align-middle text-center
                    text-nowrap">
                      <tbody v-for="item in tempOrderData.products"
                      :key="item.id">
                        <tr>
                          <td colspan="2">
                            <img :src="item.product.imageUrl"
                            width="350"
                            class="img-thumbnail my-3">
                          </td>
                        </tr>
                        <tr>
                          <th>項目</th>
                          <td>{{item.product.title}}</td>
                        </tr>
                        <tr>
                          <th>數量</th>
                          <td>{{item.qty}}</td>
                        </tr>
                        <tr>
                          <th>價格</th>
                          <td>{{item.total}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="orderDetail"
              role="tabpanel" aria-labelledby="profile-tab">
              <div class="card my-4 mx-auto">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table align-middle text-center">
                      <tbody>
                        <tr>
                          <th>訂單編號</th>
                          <td>{{tempOrderData.id}}</td>
                        </tr>
                        <tr>
                          <th>下單時間</th>
                          <td>{{$filters.date(tempOrderData.create_at)}}</td>
                        </tr>
                        <tr>
                          <th>付款時間</th>
                          <td>{{$filters.date(tempOrderData.create_at)}}</td>
                        </tr>
                        <tr>
                          <th>付款狀態</th>
                          <td>
                            <span v-if="tempOrderData.paid_date">
                              {{ $filters.date(tempOrderData.paid_date) }}
                            </span>
                            <span v-else>
                              時間不確定
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th>付款狀態</th>
                          <td class="d-flex justify-content-end">
                            <span v-if="tempOrderData.is_paid"
                            class="text-success fw-bold">已付款</span>
                            <span v-else
                            class="text-danger fw-bold">未付款</span>
                            <div class="ms-8">
                              <input type="checkbox" class="form-check-input
                              border border-success me-1"
                              v-model="tempOrderData.is_paid"
                              :true-value="true"
                              :false-value="false"
                              id="isPaid">
                              <label for="isPaid" class="form-check-label
                              text-success">
                                已付
                              </label>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>總金額</th>
                          <td>
                            <i class="bi bi-cash-coin me-1
                            text-success fs-4"></i>
                            {{ tempOrderData.total }} 元</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary"
            data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-warning"
          @click.prevent="updateOrderModal(tempOrderData)">
            修改付款狀態
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixins from '../mixins/modal';

export default {
  props: ['orderData', 'updateOrderModal'],
  mixins: [modalMixins],
  data() {
    return {
      tempOrderData: {},
    };
  },
  watch: {
    orderData() {
      this.tempOrderData = this.orderData;
    },
  },
};
</script>
