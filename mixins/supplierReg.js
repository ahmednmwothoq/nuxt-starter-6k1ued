export default {
  data() {
    return {
    }
  },
  watch: {
      'form.email' (value) {
          this.form.email = value;
          this.validateEmail(value);
      },
      'form.phone' (value) {
          this.form.phone = value;
          this.validatePhone(value);
      },
      'form.password' (value) {
          this.form.password = value;
          this.validatePass(value);
      },
      'form.confPass' (value) {
          this.form.confPass = value;
          this.validateConfPass(value);
      },
      'form.known_number' (value) {
          this.form.known_number = value;
          this.validateknownNumber(value);
      },
      'form.idNum' (value) {
          this.form.idNum = value;
          this.validateidNumber(value);
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
    validPhone() {
      let mobileRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
      if (mobileRegex.test(this.form.phone)) {
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
    validaConfimPass() {
      if (this.form.confPass == this.form.password) {
        return true;
      } else {
        return false
      }
    },
    validateidNum() {
      if (this.form.idNum.length != 10) {
        return true;
      } else {
        return false
      }
    },
    validateknownNum() {
      if (this.form.known_number.length != 10) {
        return true;
      } else {
        return false
      }
    },
    validForm() {
        return this.validPhone && this.checkCharLength && this.validateknownNum  && this.validEmail && this.validaConfimPass
    }
  },
  methods: {
    validateidNumber(value) {
      if (value.length != 10) {
        this.formErrors['idNumber'] = 'id number must be 10';
      } else {
        this.formErrors['idNumber'] = '';
      }
    },
    validateknownNumber(value) {
      if (value.length != 10) {
        this.formErrors['knownNumber'] = 'known number must be 10';
      } else {
        this.formErrors['knownNumber'] = '';
      }
    },
    validateEmail(value) {
      let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (emailRegex.test(value)) {
            this.formErrors['email'] = '';
        } else {
            this.formErrors['email'] = 'Enter a valid email address.';
        }
    },

    validatePhone(value) {
        let mobileRegex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
        if (mobileRegex.test(value)) {
            this.formErrors['phone'] = '';
        } else {
            this.formErrors['phone'] = 'Enter a valid Phone.';
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

    validateConfPass(value) {
      if (value == this.form.password) {
        this.formErrors['confPass'] = '';
      } else {
        this.formErrors['confPass'] = 'confirm Password must match with password';
      }
    },
  },
}
