export const APIRoutes = {
  Experts: '/getInfo',
  sendExpert: '/setInfo',
  uploadImage: '/uploadImage',
  getAllExpert: '/getInfoByAllExperts',
  getOtherInfo: '/getOtherInfo'
}

export const PROJECT_ID = '678dd611607cf4d445084821cf371cb9'

export const PRIZE_FUND = 250

export const CONTRACT_ADDRESS = '0xf79F7c03910c595303fC03b7d99393202C24dAEA'

export const MainContract_abi =  [{"inputs":[{"internalType":"address","name":"_USDT","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_expertId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_revardsAmount","type":"uint256"},{"indexed":false,"internalType":"bool","name":"_isVoteAdded","type":"bool"}],"name":"Donate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_expertId","type":"uint256"}],"name":"EnableMoneyBack","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_expertId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"_user","type":"address"}],"name":"GotMoneyBack","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"_name","type":"string"},{"indexed":false,"internalType":"address","name":"_expertAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"_id","type":"uint256"}],"name":"RegistrationApproved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"_name","type":"string"},{"indexed":false,"internalType":"address","name":"_expertAddress","type":"address"}],"name":"RegistrationRequested","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_startTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_endTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_revardsAmount","type":"uint256"}],"name":"RoundStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_expertId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_transfered","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_rewardPoints","type":"uint256"}],"name":"TransferDonationsToExpert","type":"event"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"OnMoneyBack","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_expertAddr","type":"address"}],"name":"approveExpert","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"donateInUSDT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"expertById","outputs":[{"internalType":"address","name":"expertAddress","type":"address"},{"internalType":"string","name":"expertName","type":"string"},{"internalType":"uint256","name":"expertId","type":"uint256"},{"internalType":"uint256","name":"votes","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"rewardPoints","type":"uint256"},{"internalType":"enum EducationPlatform.CourseStatus","name":"status","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getMoneyBack","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isExpertRegistered","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isUserRegistered","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"name":"registerAsExpert","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"registrationRequests","outputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"enum EducationPlatform.Register","name":"registrationStatus","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"round","outputs":[{"internalType":"uint256","name":"budget","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"},{"internalType":"uint256","name":"totalVotes","type":"uint256"},{"internalType":"bool","name":"roundActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_timeInHours","type":"uint256"},{"internalType":"uint256","name":"_roundRevardsPoints","type":"uint256"}],"name":"startRound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"transferTokensToExpert","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userDonation","outputs":[{"internalType":"bool","name":"isDonated","type":"bool"},{"internalType":"uint256","name":"amountOfDonations","type":"uint256"}],"stateMutability":"view","type":"function"}]

