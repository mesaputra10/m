import { action, on, props, reducer } from 'ts-action';
import ActionTypes from '../../store/action-types';

const initialState = {
  products: [],
  isFetching: false,
  keyword: '',
  totalPage: 0,
  totalProducts: 0,
  showFilter: false,
  selectedCategoryId: '',
  selectedCategoryName: '',
  selectedBrandId: 0,
  selectedBrandName: '',
  page: 1,
  brands: [],
  selectedBrands: [],
  childBrand: false,
  childCategory: false,
  isLoading: true,
  minPriceRange: 0,
  maxPriceRange: 0,
  isCategoriesLoading: false,
  categories: [],
  showSearchResults: false,
  showParentCategory: true,
  isServerError: false,
};

const IsLoading = action(ActionTypes.IS_LOADING, props<{ isLoading: boolean }>());
const ServerError = action(ActionTypes.SERVER_ERROR, props<{ isServerError: boolean }>());
const ProductSearch = action(
  ActionTypes.PRODUCTS_SEARCH,
  props<{ isFetching: boolean; keyword: string }>(),
);
const ProductsDataList = action(
  ActionTypes.PRODUCTS_DATA_LIST,
  props<{
    isFetching: boolean;
    products: any[];
    totalPage: number;
    totalProducts: number;
    brands: any[];
    keyword: string;
    page: number;
    priceRange: number;
  }>(),
);
const stateProductReset = {
  keyword: '',
  products: [],
  totalPage: 0,
  totalProducts: 0,
  brands: [],
  page: 0,
  priceRange: null,
  selectedCategoryId: '',
  selectedBrands: [],
  minPriceRange: 0,
  maxPriceRange: 0,
};
const ProductReset = action(ActionTypes.PRODUCTS_RESET, props<{ propsProductReset }>());
const SetFilter = action(ActionTypes.PRODUCTS_FILTER, props<{ showFilter: boolean }>());
const SetFilterCategory = action(
  ActionTypes.SET_FILTER_CATEGORY,
  props<{
    selectedCategoryId: string;
    selectedCategoryName: string;
  }>(),
);
const CategoriesLoading = action(
  ActionTypes.CATEGORIES_LOADING,
  props<{ isCategoriesLoading: boolean }>(),
);
const CategoriesList = action(
  ActionTypes.CATEGORIES_LIST,
  props<{
    isCategoriesLoading: boolean;
    categories: any[];
  }>(),
);
const SetFilterBrand = action(
  ActionTypes.SET_FILTER_BRAND,
  props<{
    selectedBrands: any[];
  }>(),
);
const ProductFilterChildCategory = action(
  ActionTypes.PRODUCT_FILTER_CHILD_CATEGORY,
  props<{
    childCategory: boolean;
  }>(),
);
const ProductFilterChildBrand = action(
  ActionTypes.PRODUCT_FILTER_CHILD_BRAND,
  props<{
    childBrand: boolean;
  }>(),
);
const ProdcutsFilterPricesValue = action(
  ActionTypes.PRODUCTS_FILTER_PRICES_VALUE,
  props<{
    minPriceRange: number;
    maxPriceRange: number;
  }>(),
);
const ShowSearchResultsList = action(
  ActionTypes.SHOW_SEARCH_RESULTS_LIST,
  props<{
    showSearchResults: boolean;
  }>(),
);
const ShowCategoryParent = action(
  ActionTypes.SHOW_CATEGORY_PARENT,
  props<{
    showParentCategory: boolean;
  }>(),
);

export const homeReducer = reducer<typeof initialState>(
  [
    on(IsLoading, (state, action) => ({ ...state, isLoading: action.isLoading })),
    on(ServerError, (state, action) => ({ ...state, isServerError: action.isServerError })),
    on(ProductSearch, (state, action) => ({
      ...state,
      isFetching: true,
      keyword: action.keyword,
    })),
    on(ProductsDataList, (state, action) => ({
      ...state,
      isFetching: false,
      products: action.products,
      totalPage: action.totalPage,
      totalProducts: action.totalProducts,
      brands: action.brands,
      keyword: action.keyword,
      page: action.page,
      priceRange: action.priceRange,
    })),
    on(ProductReset, (state, action) => ({ ...state, stateProductReset })),
    on(SetFilter, (state, action) => ({
      ...state,
      showFilter: action.showFilter,
    })),
    on(SetFilterCategory, (state, action) => ({
      ...state,
      selectedCategoryId: action.selectedCategoryId,
      selectedCategoryName: action.selectedCategoryName,
    })),
    on(CategoriesLoading, (state, action) => ({
      ...state,
      isCategoriesLoading: action.isCategoriesLoading,
    })),
    on(CategoriesList, (state, action) => ({
      ...state,
      isCategoriesLoading: action.isCategoriesLoading,
      categories: action.categories,
    })),
    on(SetFilterBrand, (state, action) => ({
      ...state,
      selectedBrands: action.selectedBrands,
    })),
    on(ProductFilterChildCategory, (state, action) => ({
      ...state,
      childCategory: action.childCategory,
    })),
    on(ProductFilterChildBrand, (state, action) => ({
      ...state,
      childBrand: action.childBrand,
    })),
    on(ProdcutsFilterPricesValue, (state, action) => ({
      ...state,
      minPriceRange: action.minPriceRange,
      maxPriceRange: action.maxPriceRange,
    })),
    on(ShowSearchResultsList, (state, action) => ({
      ...state,
      showSearchResults: action.showSearchResults,
    })),
    on(ShowCategoryParent, (state, action) => ({
      ...state,
      showParentCategory: action.showParentCategory,
    })),
  ],
  initialState,
);

export default homeReducer;
