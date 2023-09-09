import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { JsonUtil } from "@spt-aki/utils/JSONUtil";
import { VFS } from "@spt-aki/utils/VFS";
import { DependencyContainer } from "tsyringe";


class TrainingStims implements IPostDBLoadMod 
{
    modName = "TrainingStims"
    postDBLoad(container: DependencyContainer): void 
    {
        const Logger = container.resolve<ILogger>("WinstonLogger");
        const JsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const VFS = container.resolve<VFS>("VFS");
        const preAkiModLoader = container.resolve<PreAkiModLoader>(
            "PreAkiModLoader"
        )
        const modPath = preAkiModLoader.getModPath(this.modName)
        const config = require('../config.json')
        const mydb = JsonUtil.deserialize(VFS.readFile(`${modPath}/db.json`));
        const myItems = mydb.items
        const myLocales = mydb.locales.en.templates
        const myHandbook = mydb.templates.handbook
        const myBuffs = mydb.buffs
        
        const DB: IDatabaseTables = container.resolve<DatabaseServer>("DatabaseServer").getTables()
        const items = DB.templates.items
        const locales = DB.locales.global
        const handbook = DB.templates.handbook.Items
        const buffs = DB.globals.config.Health.Effects.Stimulator.Buffs
        
        if (config.enable_all === true) 
        {
            // Add items
            for (const itemKey in myItems) 
            {
                const path = myItems[itemKey];
                const item = JsonUtil.deserialize(VFS.readFile(`${modPath}/${path}`));
                items[item._id] = item;
            }
            // Add Handbook Entry
            for (const itemKey in myHandbook) 
            {
                const path = myHandbook[itemKey];
                const handbookitem = JsonUtil.deserialize(VFS.readFile(`${modPath}/${path}`));
                handbook.push(handbookitem)
            }
            // Add locales
            for (const localekey in myLocales)
            {
                const path = myLocales[localekey];
                const mylocale = JsonUtil.deserialize(VFS.readFile(`${modPath}/${path}`));
                this.addToLocale(locales, localekey, mylocale.Name, mylocale.ShortName, mylocale.Description)
            }
            // Add buffs
            for (const buff in myBuffs) 
            {
                const path = myBuffs[buff];
                const buffitem = JsonUtil.deserialize(VFS.readFile(`${modPath}/${path}`));
                buffs[buff] = buffitem;
            }
            const therapist = DB.traders["54cb57776803fa99248b456e"]
            const therapistAssorts = therapist.assort.items
            const therapistBS = therapist.assort.barter_scheme
            const therapistLL = therapist.assort.loyal_level_items
            const myAssorts = mydb.assort.therapist.items
            const myLL = mydb.assort.therapist.loyal_level_items
            const myBarter = mydb.assort.therapist.barter_scheme
            // Add items to therapist assort
            // Item info
            for (const itemKey in myAssorts) 
            {
                const path = myAssorts[itemKey];
                const assort = JsonUtil.deserialize(VFS.readFile(`${modPath}/${path}`));
                therapistAssorts.push(assort);
            }
            // LL info
            for (const itemKey in myLL) 
            {
                const path = myLL[itemKey];
                const llItem = JsonUtil.deserialize(VFS.readFile(`${modPath}/${path}`));
                therapistLL[itemKey] = llItem;
            }
            // Barter info
            for (const itemKey in myBarter) 
            {
                const path = myBarter[itemKey];
                const schemeItem = JsonUtil.deserialize(VFS.readFile(`${modPath}/${path}`));
                therapistBS[itemKey] = schemeItem;
            }
            // Config price and currency
            if (config.Training_Stim_1.customBarterEnabled === true) 
            {
                const ts1BS = therapistBS["Training_Stim_1"]
                const ts1Config = config.Training_Stim_1
                for (const key in ts1BS) 
                {
                    for (const key2 in ts1BS[key]) 
                    {
                        ts1BS[key][key2].count = ts1Config.price
                        ts1BS[key][key2]._tpl = ts1Config.currency
                    }
                }
            }
            // Config price and currency
            if (config.Training_Stim_2.customBarterEnabled) 
            {
                const ts2BS = therapistBS["Training_Stim_2"]
                const ts2Config = config.Training_Stim_2
                for (const key in ts2BS) 
                {
                    for (const key2 in ts2BS[key]) 
                    {
                        ts2BS[key][key2].count = ts2Config.price
                        ts2BS[key][key2]._tpl = ts2Config.currency
                    }
                }
            }
            if (config.Training_Stim_3.customBarterEnabled) 
            {
                const ts3BS = therapistBS["Training_Stim_3"]
                const ts3Config = config.Training_Stim_3
                for (const key in ts3BS) 
                {
                    for (const key2 in ts3BS[key]) 
                    {
                        ts3BS[key][key2].count = ts3Config.price
                        ts3BS[key][key2]._tpl = ts3Config.currency
                    }
                }
            }
            if (config.Training_Stim_4.customBarterEnabled) 
            {
                const ts4BS = therapistBS["Training_Stim_4"]
                const ts4Config = config.Training_Stim_4
                for (const key in ts4BS) 
                {
                    for (const key2 in ts4BS[key]) 
                    {
                        ts4BS[key][key2].count = ts4Config.price
                        ts4BS[key][key2]._tpl = ts4Config.currency
                    }
                }
            }
            if (config.Training_Stim_5.customBarterEnabled) 
            {
                const ts5BS = therapistBS["Training_Stim_5"]
                const ts5Config = config.Training_Stim_5
                for (const key in ts5BS) 
                {
                    for (const key2 in ts5BS[key]) 
                    {
                        ts5BS[key][key2].count = ts5Config.price
                        ts5BS[key][key2]._tpl = ts5Config.currency
                    }
                }
            }
            // Config effects
            if (config.Training_Stim_1.customEffectsEnabled === true) 
            {
                const ts1Buffs = config.Training_Stim_1.effect
                buffs["Buffs_Training_01"] = ts1Buffs
            }
            if (config.Training_Stim_2.customEffectsEnabled) 
            {
                const ts2Buffs = config.Training_Stim_2.effect
                buffs["Buffs_Training_02"] = ts2Buffs
            }
            if (config.Training_Stim_3.customEffectsEnabled) 
            {
                const ts3Buffs = config.Training_Stim_3.effect
                buffs["Buffs_Training_03"] = ts3Buffs
            }
            if (config.Training_Stim_4.customEffectsEnabled) 
            {
                const ts4Buffs = config.Training_Stim_4.effect
                buffs["Buffs_Training_04"] = ts4Buffs
            }
            if (config.Training_Stim_5.customEffectsEnabled) 
            {
                const ts5Buffs = config.Training_Stim_5.effect
                buffs["Buffs_Training_05"] = ts5Buffs
            }
            // Config uses
            if (config.Training_Stim_1.customUseAmountEnabled) 
            {
                const numUses = config.Training_Stim_1.useAmount
                items["Training_Stim_1"]._props.MaxHpResource = numUses
            }
            if (config.Training_Stim_2.customUseAmountEnabled) 
            {
                const numUses = config.Training_Stim_2.useAmount
                items["Training_Stim_1"]._props.MaxHpResource = numUses
            }
            if (config.Training_Stim_3.customUseAmountEnabled) 
            {
                const numUses = config.Training_Stim_3.useAmount
                items["Training_Stim_1"]._props.MaxHpResource = numUses
            }
            if (config.Training_Stim_4.customUseAmountEnabled) 
            {
                const numUses = config.Training_Stim_4.useAmount
                items["Training_Stim_1"]._props.MaxHpResource = numUses
            }
            if (config.Training_Stim_5.customUseAmountEnabled) 
            {
                const numUses = config.Training_Stim_5.useAmount
                items["Training_Stim_1"]._props.MaxHpResource = numUses
            }
            Logger.logWithColor(`${this.modName} - Loaded successfully`, LogTextColor.CYAN)
        }
    }

    private addToLocale(locales, id:string, name:string, shortname:string, description:string)
    {
        for (const locale of Object.values(locales))
        {
            locale[`${id} Name`] = name;
            locale[`${id} ShortName`] = shortname;
            locale[`${id} Description`] = description;
        }
    }
}

module.exports = {
    mod: new TrainingStims()
}
