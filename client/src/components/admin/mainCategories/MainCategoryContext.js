export const mainCategoryState = {
  mainCategories: [],
  addMainCategoryModal: false,
  editMainCategoryModal: {
    modal: false,
    mId: null,
    des: "",
    status: "",
  },
  loading: false,
};

export const mainCategoryReducer = (state, action) => {
  switch (action.type) {
    /* Get all category */
    case "fetchMainCategoryAndChangeState":
      return {
        ...state,
        mainCategories: action.payload,
      };
    /* Create a category */
    case "addMainCategoryModal":
      return {
        ...state,
        addMainCategoryModal: action.payload,
      };
    /* Edit a category */
    case "editMainCategoryModalOpen":
      return {
        ...state,
        editMainCategoryModal: {
          modal: true,
          mId: action.mId,
          des: action.des,
          status: action.status,
        },
      };
    case "editMainCategoryModalClose":
      return {
        ...state,
        editMainCategoryModal: {
          modal: false,
          mId: null,
          des: "",
          status: "",
        },
      };
    case "loading":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
