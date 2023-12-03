import request from "@/services/request";
export default function listProductsInCategory(category) {
  return request.get(`products/category/${category}`).then(({data}) => data)
}