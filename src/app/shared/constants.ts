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
    preview: 'preview',
    clearPreview: 'clearPreview'
  },
  dialogs: {
    passwordReset: 'passwordReset',
    cropper: 'cropper',
    changePassword: 'changePassword',
    areYouSure: 'areYouSure',
    customGoals: 'customGoals'
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
  ],
  dataActions: {
    removed: 'removed'
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
    {
      title: 'Be active',
      content: 'The intake and consumption of energy must be balanced. To maintain a normal metabolism and good health, you must move and reduce the time spent during the day in a sitting position, especially behind various screens.'
    },
    {
      title: 'More foods with fiber',
      content: 'In order for your menu to have enough fiber necessary for normal digestion, you need to eat both cereal products and fruits, vegetables and berries. Reduce your intake of white flour foods and eat more whole grains rich in fiber and more nutritious. Eat buckwheat and other cereals, prefer whole grain options to regular pasta and rice, and use whole grain flour for baking. A good breakfast is cereal and whole grain high fiber cereal.'
    },
    {
      title: 'Give preference to fish',
      content: 'Fish should be on our table 2-3 times a week, because it contains omega-3 fatty acids necessary for the body, which reduce the risk of developing common diseases, such as, for example, diseases of the cardiovascular system. Fish is also an indispensable source of vitamin D, which in turn helps the body better absorb calcium, which contributes to healthy bones. You need to eat both red and white fish, eat less canned fish, salted and smoked fish, because they contain a lot of salt. Depending on the type of fish, at least 200 grams should be eaten per week.'
    },
    {
      title: 'Less salt',
      content: 'Most of the excess salt goes on a plate against our will with canned and prepared food. In fact, we get a lot of salt from everyday foods like bread, cheese, and ham. To consume less salt, look for less salty alternatives among similar products and give preference to products that you cook yourself with fresh ingredients, rather than purchased food. When cooking, instead of salt, you can use spicy herbs and other seasonings. Serving ready meals on the table, you can add a pinch of salt to them.'
    },
    {
      title: 'More water',
      content: 'Water is essential for transporting nutrients and their residues, the normal functioning of digestive juices, and more. In total, an adult needs 28–35 ml of water per kilogram of body weight, i.e. OK. 2-3 liters. If a person eats normally, he receives most of the liquid from food, for example, from fruits and vegetables, soups and drinks. An adult should additionally drink 2-3 glasses of water per day, and in hot weather and if he is involved in sports - even more. The best drink is pure water.'
    },
    {
      title: 'Avoid alcohol',
      content: 'The metabolism in the human body does not need alcohol. When drinking alcohol, men should not drink more than four, and women should not drink more than two units of alcohol per day. One unit is a quantity that contains 10 grams of absolute alcohol. Every week should be at least three days completely alcohol-free. It should also be remembered that, in addition to other possible harmful effects, alcohol in large quantities gives additional energy. For example, one unit of alcohol is about 4 cl of strong 40% alcohol or 12 cl of 12% wine; 0.5 liters of beer (5.2%) are two units of alcohol.'
    },
    {
      title: 'Appreciate the food',
      content: 'Learn to cook food yourself and do it slowly and with pleasure, and even better - in company. As a rule, people who cook themselves eat healthier foods. Semi-finished foods purchased at the store that can be quickly heated and swallowed contain too much fat, sugar and / or salt, and few dietary fiber, vitamins, and minerals. Unhealthy eating is often the result of a comfortable and too fast lifestyle. When you quickly have a snack by the refrigerator or eat in front of the TV, you can easily lose control over the amount you eat.'
    },
    {
      title: 'Less sugar',
      content: 'Added sugars are sugars that are added to food in the food industry (for example, in sweets, confectionery, soft drinks and juice drinks, curd pastes, yoghurts, as well as in some meat products), or which you add when cooking (for example in coffee, tea or desserts). Some yogurt cups may contain about 40 grams of sugar, and in a 500 ml bottle with a soft drink, more than 50 grams of added sugar. If you consume such foods, then on the same day you can no longer eat sugar and other sweets. Remember that soft drinks do not quench your thirst. Thirst is best quenched by water. Instead of sweets and cakes, eat fresh or dried fruit for dessert.'
    },
    {
      title: 'Consume fats wisely',
      content: 'Our body necessarily needs fats, but in small amounts. Therefore, when cooking, you should give preference to steaming, boiling, stewing or baking in the oven, rather than frying in a lot of fat. To reduce the content of saturated fatty acids in the food itself, before cooking remove the skin from the product (including chicken), remove the fat and lard visible to the eye. Be careful about hidden fats found, for example, in pies, pastries, and processed meats. Use cooking oil for cooking. Try to diversify your menu by adding nuts, almonds and seeds. Do not be afraid of fish oil!'
    },
    {
      title: 'Start with breakfast',
      content: 'Breakfast should be plentiful enough to be energized for the whole day. At night, the body consumes the reserves of carbohydrates that have accumulated in the liver, and in the morning they should be restored. If you do not eat breakfast, the body will begin to decompose its own reserves, which can lead to a decrease in the efficiency of the functioning of the body, for example, a decrease in working capacity, learning ability and concentration. The carbohydrates that we get with breakfast are used immediately, and the body does not put them as fat. Breakfast should be saturated with slowly absorbed carbohydrates. Various cereals are good, especially whole grain cereals. Sandwiches are also suitable, and you can afford a small treat for breakfast.'
    }
  ]
};
