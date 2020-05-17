export const APP = {
  controlErrors: {
    required: 'required',
    minLength: 'minlength',
    match: 'match'
  },
  colors: {
    primary: 'primary',
    accent: 'accent',
    warn: 'warn'
  },
  controlNames: {
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Password confirmation',
    nickname: 'Nickaname',
    oldPassword: 'Old password'
  },
  formStatuses: {
    valid: 'VALID',
    invalid: 'INVALID'
  },
  pages: {
    signIn: 'auth/sign-in',
    signUp: 'auth/sign-up',
    settings: 'settings',
    myFood: 'my-food',
    addProduct: 'add-product',
    dishes: 'dishes',
    addDish: 'add-dish',
    videos: 'videos',
    addVideo: 'add-video',
    activity: 'activity'
  },
  subjects: {
    notificationVisibility: 'notificationVisibility',
    newProduct: 'newProduct',
    flyingProduct: 'flyingProduct',
    preview: 'preview',
    clearPreview: 'clearPreview',
    history: 'history',
    mobileEating: 'mobileEating',
    closeMobileEatings: 'closeMobileEating',
    subCurrentProducts: 'subCurrentProducts',
    spinnerVisibility: 'spinnerVisibility'
  },
  dialogs: {
    passwordReset: 'passwordReset',
    cropper: 'cropper',
    changePassword: 'changePassword',
    areYouSure: 'areYouSure',
    customGoals: 'customGoals',
    dailyReport: 'dailyReport',
    videoPlay: 'videoPlay',
    autoCalc: 'autoCalc',
    editProduct: 'editProduct',
    editDish: 'editDish',
    mobileProgress: 'mobileProgress',
    filter: 'filter',
    mobileFoodOptions: 'mobileFoodOptions',
    currentEating: 'currentEating',
    mobileSelect: 'mobileSelect',
    mobileEating: 'mobileEating',
    dishDetails: 'dishDetails',
    productDetails: 'productDetails',
    mobileSelection: 'mobileSelection'
  },
  routesWithHeader: [
    'settings',
    'my-food',
    'add-product',
    'dishes',
    'videos',
    'add-video',
    'history',
    'activity'
  ],
  cachedData: {
    userId: 'userId',
    userData: 'userData'
  },
  defaultAvatar: 'unknown-user.jpg',
  hours: [
    { title: '00:00', value: 0 },
    { title: '01:00', value: 1 },
    { title: '02:00', value: 2 },
    { title: '03:00', value: 3 },
    { title: '04:00', value: 4 },
    { title: '05:00', value: 5 },
    { title: '06:00', value: 6 },
    { title: '07:00', value: 7 },
    { title: '08:00', value: 8 },
    { title: '09:00', value: 9 },
    { title: '10:00', value: 10 },
    { title: '11:00', value: 11 },
    { title: '12:00', value: 12 },
    { title: '13:00', value: 13 },
    { title: '14:00', value: 14 },
    { title: '15:00', value: 15 },
    { title: '16:00', value: 16 },
    { title: '17:00', value: 17 },
    { title: '18:00', value: 18 },
    { title: '19:00', value: 19 },
    { title: '20:00', value: 20 },
    { title: '21:00', value: 21 },
    { title: '22:00', value: 22 },
    { title: '23:00', value: 23 }
  ],
  languages: [
    'English',
    'Russian',
    'Spanish'
  ],
  categories: [
    { title: 'my-food.vegetables', value: 'Vegetables' },
    { title: 'my-food.fruits', value: 'Fruits' },
    { title: 'my-food.grains', value: 'Grains' },
    { title: 'my-food.dairy', value: 'Dairy' },
    { title: 'my-food.pasta', value: 'Pasta' },
    { title: 'my-food.oils', value: 'Oils' },
    { title: 'my-food.meat', value: 'Meat' },
    { title: 'my-food.fish', value: 'Fish' },
    { title: 'my-food.nuts', value: 'Nuts' },
    { title: 'my-food.desert', value: 'Desert' },
    { title: 'my-food.pizza', value: 'Pizza' },
    { title: 'my-food.drink', value: 'Drink' },
    { title: 'my-food.other', value: 'Other' }
  ],
  dishCategories: [
    { title: 'my-food.soups', value: 'Soups' },
    { title: 'my-food.salads', value: 'Salads' },
    { title: 'my-food.sandwiches', value: 'Sandwiches & Wraps' },
    { title: 'my-food.pasta', value: 'Pasta' },
    { title: 'my-food.pizza', value: 'Pizza' },
    { title: 'my-food.breakfast', value: 'Breakfast' },
    { title: 'my-food.drink', value: 'Drink' },
    { title: 'my-food.dinner', value: 'Dinner' },
    { title: 'my-food.supper', value: 'Supper' },
    { title: 'my-food.lunch', value: 'Lunch' },
    { title: 'my-food.other', value: 'Other' }
  ],
  dataActions: {
    removed: 'removed',
    modified: 'modified'
  },
  goals: [
    'lose weight',
    'maintain weight',
    'gain weight'
  ],
  activities: [
    'no physical activity',
    '3 trainings per week',
    '5 trainings per week',
    '5 intense trainings per week',
    'training every day',
    'intense trainings every day or more than one time per day',
    'daily physical activity plus physical work'
  ],
  advice: [
    'be-active',
    'more-foods-with-fiber',
    'give-preference-to-fish',
    'less-salt',
    'more-water',
    'avoid-alcohol',
    'appreciate-the-food',
    'less-sugar',
    'consume-fats-wisely',
    'start-with-breakfast'
  ],
  months: [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec'
  ],
  daysOfWeek: [
    'sun',
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'sat'
  ],
  // searchOutsideUrl: 'https://e-dostavka.by/search/',
  // searchOutsideUrl: 'https://us-central1-gisfit-production.cloudfunctions.net/evrooptProxy/search-outside',
  searchOutsideUrl: 'http://localhost:3000/search-outside',
isMobile: window.outerWidth ? window.outerWidth < 992 : false
};
