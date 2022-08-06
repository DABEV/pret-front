export default{
    methods: {
        openNotification(border_, title_, text_) {
            this.$vs.notification({
              progress: 'auto',
              position: null,
              title: title_,
              text: text_,
              border: border_,
              icon: `<i class='bx bxs-time'></i>`,
            })
        }
    }
}