const UserPasswordResetFinal = function(ft) {
    this.email = ft.email;
    this.newPassword = ft.newPassword,
    this.newPasswordConfirm = ft.newPasswordConfirm,
    this.passwordResetHash = ft.passwordResetHash
};
module.exports = UserPasswordResetFinal;