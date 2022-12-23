export default {
  data() {
    return {
      showModel: false,
      errorMsg: {
        text: '',
        msg: ''
      },
    }
  },
  watch: {
      'form.email' (value) {
          this.form.email = value;
          this.validateEmail(value);
      },
      'form.password' (value) {
          this.form.password = value;
          this.validatePass(value);
      },
      showModel: function (val) {
        if (val) {
          setTimeout(() => {
            this.showModel = false
          }, 2000);
        }
      },
  },
  computed: {
    validEmail() {
        let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (emailRegex.test(this.form.email)) {
            return true;
        } else {
          return false
        }
    },
    checkCharLength() {
        let CharLength = /^.{8,50}$/;
        if (CharLength.test(this.form.password)) {
            return true;
        } else {
          return false
        }
    },
    validForm() {
        return this.validEmail && this.checkCharLength
    }
  },
  methods: {
    validateEmail(value) {
      let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (emailRegex.test(value)) {
            this.formErrors['email'] = '';
        } else {
            this.formErrors['email'] = 'Enter a valid email address.';
        }
    },

    validatePass(value) {
        let CharLength = /^.{8,50}$/;
        if (CharLength.test(value)) {
            this.formErrors['password'] = '';
        } else {
            this.formErrors['password'] = 'Password must have at least 8 char or more';
        }
    },


  },
}
