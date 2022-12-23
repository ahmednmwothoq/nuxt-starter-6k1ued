export default {
  data() {
    return {
    }
  },
  watch: {
      'form.newPass' (value) {
          this.form.newPass = value;
          this.validatePass(value);
      },
      'form.confPass' (value) {
          this.form.confPass = value;
          this.validateConfPass(value);
      },
  },
  computed: {
    checkCharLength() {
        let CharLength = /^.{8,50}$/;
        if (CharLength.test(this.form.newPass)) {
            return true;
        } else {
          return false
        }
    },
    validaConfimPass() {
      if (this.form.confPass == this.form.newPass) {
        return true;
      } else {
        return false
      }
    },
    validForm() {
        return this.checkCharLength  && this.validaConfimPass
    }
  },
  methods: {
    validatePass(value) {
        let CharLength = /^.{8,50}$/;
        if (CharLength.test(value)) {
            this.formErrors['newPass'] = '';
        } else {
            this.formErrors['newPass'] = 'Password must have at least 8 char or more';
        }
    },

    validateConfPass(value) {
      if (value == this.form.newPass) {
        this.formErrors['confPass'] = '';
      } else {
        this.formErrors['confPass'] = 'confirm Password must match with password';
      }
    },
  },
}
