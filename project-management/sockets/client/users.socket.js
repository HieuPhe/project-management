const User = require("../../models/user.model");
const RoomChat = require("../../models/rooms-chat.model");

module.exports = (res) => {
  _io.once('connection', (socket) => {
    // Chức năng gửi yêu cầu
    socket.on("CLIENT_ADD_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;

      // console.log(myUserId); //Id cua A
      // console.log(userId); //Id cua B

      //Them id cua A vao acceptFriend cua B
      const existIdAinB = await User.findOne({
        _id: userId,
        acceptFriends: myUserId
      });

      if (!existIdAinB) {
        await User.updateOne({
          _id: userId
        }, {
          $push: { acceptFriends: myUserId }
        });
      }

      //Them id cua B vao requestFriends cua A
      const existIdBinA = await User.findOne({
        _id: myUserId,
        requestFriends: userId
      });

      if (!existIdBinA) {
        await User.updateOne({
          _id: myUserId
        }, {
          $push: { requestFriends: userId }
        });
      }

      // Lấy ra độ dài acceptFriend của B và trả về cho B
      const infoUserB = await User.findOne({
        _id: userId
      });
      const lengthAcceptFriends = infoUserB.acceptFriends.length;

      socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
        userId: userId,
        lengthAcceptFriends: lengthAcceptFriends
      });

      // Lấy info của A trả về cho B
      const infoUserA = await User.findOne({
        _id: myUserId
      }).select("id avatar fullName");

      socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND", {
        userId: userId,
        infoUserA: infoUserA
      });
    });

    // Chức năng hủy gửi yêu cầu
    socket.on("CLIENT_CANCEL_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;

      // console.log(myUserId); //Id cua A
      // console.log(userId); //Id cua B

      //Xoa id cua A trong acceptFriend cua B
      const existIdAinB = await User.findOne({
        _id: userId,
        acceptFriends: myUserId
      });

      if (existIdAinB) {
        await User.updateOne({
          _id: userId
        }, {
          $pull: { acceptFriends: myUserId }
        });
      }

      //Xoa id cua B trong requestFriends cua A
      const existIdBinA = await User.findOne({
        _id: myUserId,
        requestFriends: userId
      });

      if (existIdBinA) {
        await User.updateOne({
          _id: myUserId
        }, {
          $pull: { requestFriends: userId }
        });
      }
      const infoUserB = await User.findOne({
        _id: userId
      });
      const lengthAcceptFriends = infoUserB.acceptFriends.length;

      socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
        userId: userId,
        lengthAcceptFriends: lengthAcceptFriends
      });

      // Lấy id của A trả về cho B
      socket.broadcast.emit("SERVER_RETURN_USER_ID_CANCEL_FRIEND", {
        userIdB: userId,
        userIdA: myUserId
      });

    });


    // Chức năng từ chối kết bạn
    socket.on("CLIENT_REFUSE_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;

      // console.log(myUserId); //Id cua B
      // console.log(userId); //Id cua A

      //Xoa id cua A trong acceptFriend cua B
      const existIdAinB = await User.findOne({
        _id: myUserId,
        acceptFriends: userId
      });

      if (existIdAinB) {
        await User.updateOne({
          _id: myUserId
        }, {
          $pull: { acceptFriends: userId }
        });
      }

      //Xoa id cua B trong requestFriends cua A
      const existIdBinA = await User.findOne({
        _id: userId,
        requestFriends: myUserId
      });

      if (existIdBinA) {
        await User.updateOne({
          _id: userId
        }, {
          $pull: { requestFriends: myUserId }
        });
      }
    });

    // Chức năng chấp nhận kết bạn
    socket.on("CLIENT_ACCEPT_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;

      // console.log(myUserId); //Id cua B
      // console.log(userId); //Id cua A

      // Check exist
      const existIdAinB = await User.findOne({
        _id: myUserId,
        acceptFriends: userId
      });

      const existIdBinA = await User.findOne({
        _id: userId,
        requestFriends: myUserId
      });


      // Tạo phòng chat chung
      let roomChat;

      if (existIdAinB && existIdBinA) {
        const dataRoom = {
          typeRoom: "friend",
          users: [
            {
              user_id: userId,
              role: "superAdmin"
            },
            {
              user_id: myUserId,
              role: "superAdmin"
            }
          ]
        };

        roomChat = new RoomChat(dataRoom);
        await roomChat.save();
      }

      // Thêm {user_id, room_chat_id của A vào friendList của B}
      //Xoa id cua A trong acceptFriend cua B
      if (existIdAinB) {
        await User.updateOne({
          _id: myUserId
        }, {
          $push: {
            friendList: {
              user_id: userId,
              room_chat_id: roomChat.id
            }
          },
          $pull: { acceptFriends: userId }
        });
      }

      // Thêm {user_id, room_chat_id của B vào friendList của A}
      //Xoa id cua B trong requestFriends cua A
      if (existIdBinA) {
        await User.updateOne({
          _id: userId
        }, {
          $push: {
            friendList: {
              user_id: myUserId,
              room_chat_id: roomChat.id
            }
          },
          $pull: { requestFriends: myUserId }
        });
      }
    });


  });

}