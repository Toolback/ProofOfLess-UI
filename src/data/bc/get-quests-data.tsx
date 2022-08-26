import IPLDiamond from "@/lib/PLDiamond";
import { ethers } from "ethers";

export async function retrieveAllListedQuests() {
  // let signer = new ethers.providers.JsonRpcProvider(
  //   "https://polygon-mumbai.g.alchemy.com/v2/AMF884Dlsw1T-bZdbATBL56StrscRbvp")
    const instance = await IPLDiamond();
    const activeQuests = await instance.getAllActiveQuests();
  
    let allQuestsData:any = []
    await activeQuests.map(async (unitQuestId:any) => {
      const reqQuest = await instance.getQuestData(Number(unitQuestId))
      const questName = reqQuest.questName;
      const questId = Number(reqQuest.questId);
      const questType = "Social Media";
      const startPeriod = new Date(Number(reqQuest.startPeriod) * 1000).toLocaleDateString("fr-EU")
      const endPeriod = new Date(Number(reqQuest.endPeriod) * 1000).toLocaleDateString("fr-EU")
      // const startPeriod = (Number(reqQuest.startPeriod)).toString()
      // const endPeriod = (Number(reqQuest.endPeriod)).toString()

      const stableReward = Number(reqQuest.questBalance)
      const lessReward = Number(reqQuest.lessReward)
      const participants = reqQuest.participants.length
      const actionCall = Number(reqQuest.questId)
      const unitQuest = {
          questName,
          questId,
          questType,           
          questDuration: {startPeriod, endPeriod},
          questReward: {stableReward, lessReward},
          participants,
          actionCall
      }
      await allQuestsData.push(unitQuest)
    })
    const req2 = await instance.totalSupply();
    const totalUsers = Number(req2)
    return {
        activeQuestData: await allQuestsData,
        totalUsers
    }
} 