import request from "@/services/request";
export default function getProduct(id) {
  return request.get(`products/${id}`).then(({data}) => data)
}