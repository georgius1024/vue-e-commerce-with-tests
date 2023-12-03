import request from "@/services/request";
export default function listCategories() {
  return request.get('products/categories').then(({data}) => data)
}