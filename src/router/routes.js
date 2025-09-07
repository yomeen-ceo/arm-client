
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'contact', path: 'contact', component: () => import('pages/order/Contact.vue') },
      { name: 'orderList', path: 'orderList', component: () => import('pages/order/OrderList.vue') },
      { name: 'setEng', path: 'setEng', component: () => import('pages/set/SetEng.vue') },
      { name: 'setList', path: 'setList', component: () => import('pages/set/SetList.vue') },
      { name: 'orderHome', path: '', component: () => import('pages/order-home/OrderHome.vue') },
      { name: 'productList', path: 'productList', component: () => import('pages/product/ProductList.vue') },
      { name: 'productSetup', path: ':productId/productSetup', component: () => import('pages/product/ProductSetup.vue') },
      { name: 'tasteList', path: 'tasteList', component: () => import('pages/product/TasteList.vue') },
      { name: 'tasteSetup', path: 'tasteSetup', component: () => import('pages/product/TasteSetup.vue') },
      { name: 'ingredientsList', path: 'ingredientsList', component: () => import('pages/product/IngredientsList.vue') },
      { name: 'ingredientsSetup', path: 'ingredientsSetup', component: () => import('pages/product/IngredientsSetup.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
