const express = require("express")
const router = express.Router()

const {
  getProfile,
  editProfile,
  getCards,
  getCardById,
  getDayById,
  updateCard,
  updateDay,
  createCard,
  deleteCard,
} = require("../controllers/secure-controllers")

router.route("/profile").get(getProfile)
router.route("/profile/edit").put(editProfile)

router.route("/cards").get(getCards)
router.route("/cards/:card_id").get(getCardById)
router.route("/cards").post(createCard)
router.route("/cards/:card_id").put(updateCard)
router.route("/cards/:card_id").delete(deleteCard)
router.route("/cards/:card_id/days/:day_id").get(getDayById)
router.route("/cards/:card_id/days/:day_id").put(updateDay)

module.exports = router
