// Chức năng gửi yêu cầu
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (listBtnAddFriend.length > 0) {
  listBtnAddFriend.forEach(button => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.add("add");

      const userId = button.getAttribute("btn-add-friend");

      socket.emit("CLIENT_ADD_FRIEND", userId);
    });
  });
}

// Chức năng hủy yêu cầu
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelFriend.length > 0) {
  listBtnCancelFriend.forEach(button => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.remove("add");

      const userId = button.getAttribute("btn-cancel-friend");

      socket.emit("CLIENT_CANCEL_FRIEND", userId);
    });
  });
}

// Chức năng từ chối kết bạn
const refuseFriend = (button) => {
  button.addEventListener("click", () => {
    button.closest(".box-user").classList.add("refuse");

    const userId = button.getAttribute("btn-refuse-friend");

    socket.emit("CLIENT_REFUSE_FRIEND", userId);
  });
};

const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefuseFriend.length > 0) {
  listBtnRefuseFriend.forEach(button => {
    refuseFriend(button);
  });
}

// Chức năng chấp nhận kết bạn
const acceptFriend = (button) => {
  button.addEventListener("click", () => {
    button.closest(".box-user").classList.add("accepted");

    const userId = button.getAttribute("btn-accept-friend");

    socket.emit("CLIENT_ACCEPT_FRIEND", userId);
  });
}

const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if (listBtnAcceptFriend.length > 0) {
  listBtnAcceptFriend.forEach(button => {
    acceptFriend(button);
  });
}

// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
const badgeUsersAccept = document.querySelector("[badge-users-accept]")
if (badgeUsersAccept) {
  const userId = badgeUsersAccept.getAttribute("badge-users-accept");
  socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
    if (userId === data.userId) {
      badgeUsersAccept.innerHTML = data.lengthAcceptFriends;
    }
  });
}


// SERVER_RETURN_INFO_ACCEPT_FRIEND
socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
  // Trang lời mời đã nhận
  const dataUserAccept = document.querySelector("[data-users-accept]");
  if (dataUserAccept) {
    const userId = dataUserAccept.getAttribute("data-users-accept");
    if (userId === data.userId) {
      // Vẽ user ra giao diện
      const div = document.createElement("div");
      div.classList.add("col-6");
      div.setAttribute("user-id", data.infoUserA._id);
      div.innerHTML = `
      <div class="box-user">
        <div class="inner-avatar">
          <img src="/images/avatar.png" alt="${data.infoUserA.fullName}">
        </div>
        <div class="inner-info">
          <div class="inner-name">${data.infoUserA.fullName}</div>
          <div class="inner-buttons">
            <button 
              class="btn btn-sm btn-primary mr-1" 
              btn-accept-friend="${data.infoUserA._id}">
              Chấp nhận
            </button>
            <button 
              class="btn btn-sm btn-secondary mr-1" 
              btn-refuse-friend="${data.infoUserA._id}">
              Xóa
            </button>
            <button 
              class="btn btn-sm btn-secondary mr-1" 
              btn-deleted-friend="btn-deleted-friend" 
              disabled="disabled">
              Đã xóa
            </button>
            <button 
              class="btn btn-sm btn-primary mr-1" 
              btn-accepted-friend="btn-accepted-friend" 
              disabled="disabled">
              Đã chấp nhận
            </button>
          </div>
        </div>
      </div>
      `;
      dataUserAccept.appendChild(div);

      // Hủy lời mời kết bạn
      const buttonRefuse = div.querySelector("[btn-refuse-friend]");
      refuseFriend(buttonRefuse);

      // Chấp nhận lời mời kết bạn
      const buttonAccept = div.querySelector("[btn-accept-friend]");
      acceptFriend(buttonAccept);
    }
  }

  // Trang danh sách người dùng
  const dataUserNotFriend = document.querySelector("[data-users-not-friend]");
  if (dataUserNotFriend) {
    const userId = dataUserNotFriend.getAttribute("data-users-not-friend");
    if (userId === data.userId) {
      const boxUserRemove = dataUserNotFriend.querySelector(`[user-id='${data.infoUserA._id}']`);
      if (boxUserRemove) {
        dataUserNotFriend.removeChild(boxUserRemove);
      }
    }
  }
});


// SERVER_RETURN_USER_ID_CANCEL_FRIEND
socket.on("SERVER_RETURN_USER_ID_CANCEL_FRIEND", (data) => {
  const boxUserRemove = document.querySelector(`[user-id='${data.userIdA}']`);
  if (boxUserRemove) {
    const dataUserAccept = document.querySelector("[data-users-accept]");
    const userIdB = badgeUsersAccept.getAttribute("badge-users-accept");
    if (userIdB == data.userIdB) {
      dataUserAccept.removeChild(boxUserRemove);
    }
  }
});

// SERVER_RETURN_USER_STATUS_ONLINE
socket.on("SERVER_RETURN_USER_STATUS_ONLINE", (data) => {
  const dataUsersFriend = document.querySelector("[data-users-friend]");
  if (dataUsersFriend) {
    const boxUser = dataUsersFriend.querySelector(`[user-id="${data.userId}"]`);
    if (boxUser) {
      const boxStatus = boxUser.querySelector("[status]");
      boxStatus.setAttribute("status", data.status);
    }
  }
});

