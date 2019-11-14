<template>
  <div class="contact-strip">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="contact-box horizontal">
            <p class="contact-text">רוצים לשמוע עוד? השאירו פרטים וניצור איתכם קשר!</p>
            <form>
              <div class="row">
                <div class="col-sm-3">
                  <input id="full_name" type="text" class placeholder="שם מלא">
                  <span class="error arrow_box" id="full_name_err_valid">*יש להזין שם תקין.</span>
                  <span class="empty_field arrow_box" id="full_name_err_required">*זה שדה חובה.</span>
                </div>
                <div class="col-sm-3">
                  <input id="contact_phone" type="tel" class placeholder="טלפון">
                  <span class="error arrow_box" id="phone_err_valid">*יש להזין מספר טלפון תקין.</span>
                  <span class="empty_field arrow_box" id="phone_err_required">*זה שדה חובה.</span>
                </div>
                <div class="col-sm-3">
                  <input id="email" type="email" class placeholder="דוא''ל">
                  <span class="error arrow_box" id="email_err_valid">*יש להזין דוא"ל תקין.</span>
                  <span class="empty_field arrow_box" id="email_err_required">*זה שדה חובה.</span>
                </div>
                <div class="col-sm-3">
                  <button class="btn btn-main" type="button" onclick="checkLandingForm();">
                    שלחו פנייה
                    <img width="16" height="12" src="~assets/images/arrow.svg" alt>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <!-- end  homepage quick links -->
      </div>
    </div>
  </div>
</template>
