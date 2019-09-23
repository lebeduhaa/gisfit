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
    addProduct: 'add-product'
  },
  subjects: {
    notificationVisibility: 'notificationVisibility',
    newProduct: 'newProduct',
    flyingProduct: 'flyingProduct',
    preview: 'preview'
  },
  dialogs: {
    passwordReset: 'passwordReset',
    cropper: 'cropper',
    changePassword: 'changePassword'
  },
  routesWithHeader: [
    'settings',
    'my-food',
    'add-product'
  ],
  cachedData: {
    userId: 'userId'
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
    'Russian'
  ],
  categories: [
    'Vegetables',
    'Fruits',
    'Grains',
    'Dairy',
    'Oils',
    'Meat',
    'Fish',
    'Other'
  ]
};
