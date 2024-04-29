QBCore = exports['qb-core']:GetCoreObject()
mdtDisplay = false
local tabletObj = nil
local tabletDict = "amb@code_human_in_bus_passenger_idles@female@tablet@base"
local tabletAnim = "base"
local tabletProp = `prop_cs_tablet`
local tabletBone = 60309
local tabletOffset = vector3(0.03, 0.002, -0.0)
local tabletRot = vector3(10.0, 160.0, 0.0)
local takingPicture = false

function SendReactMessage(action, data)
    SendNUIMessage({
      action = action,
      data = data
    })
end

RegisterNUICallback("getLang", function(data, cb)
    cb(Config.Txt)
end)

RegisterNUICallback("getLicenses", function(data, cb)
    cb(Config.LicenseTypes)
end)

function doAnimation()
    if not mdtDisplay then return end
    -- Animation
    RequestAnimDict(tabletDict)
    while not HasAnimDictLoaded(tabletDict) do Wait(100) end
    -- Model
    RequestModel(tabletProp)
    while not HasModelLoaded(tabletProp) do Wait(100) end

    local plyPed = PlayerPedId()
    tabletObj = CreateObject(tabletProp, 0.0, 0.0, 0.0, true, true, false)
    local tabletBoneIndex = GetPedBoneIndex(plyPed, tabletBone)

    AttachEntityToEntity(tabletObj, plyPed, tabletBoneIndex, tabletOffset.x, tabletOffset.y, tabletOffset.z, tabletRot.x, tabletRot.y, tabletRot.z, true, false, false, false, 2, true)
    SetModelAsNoLongerNeeded(tabletProp)

    CreateThread(function()
        while mdtDisplay do
            Wait(0)
            if not IsEntityPlayingAnim(plyPed, tabletDict, tabletAnim, 3) then
                TaskPlayAnim(plyPed, tabletDict, tabletAnim, 3.0, 3.0, -1, 49, 0, 0, 0, 0)
            end
        end

        ClearPedSecondaryTask(plyPed)
        Wait(250)
        DetachEntity(tabletObj, true, false)
        DeleteEntity(tabletObj)
    end)
end


function DispalyMDT()
    if QBCore.Functions.GetPlayerData().job.name == "police" then
        mdtDisplay = not mdtDisplay
        SetNuiFocus(mdtDisplay, mdtDisplay)
        SendReactMessage("setDisplay", mdtDisplay)
        QBCore.Functions.TriggerCallback("nMDT:server-prapereMDT", function(data)
            SendReactMessage("sendMDTData", data)
        end)
        doAnimation()
    else
        QBCore.Functions.Notify('Bunu yapamazsın.', 'error')
    end
end

RegisterNUICallback("hideFrame", function()
    mdtDisplay = false
    SetNuiFocus(mdtDisplay, mdtDisplay)
    ClearPedSecondaryTask(PlayerPedId())
    SetEntityAsMissionEntity(tabletObj)
    DetachEntity(tabletObj, true, false)
    DeleteObject(tabletObj)
end)

RegisterNetEvent("nMDT-showMDT", DispalyMDT)
RegisterCommand("mdt", DispalyMDT)


RegisterNetEvent("nMDT:client-SendMessage", function(name, data)
    SendReactMessage(name, data)
end)

RegisterNUICallback("updateProfile", function(data)
    TriggerServerEvent("nMDT:server-updateProfile", data)
end)

RegisterNUICallback("takePicture", function(data, cb)
    cachePlayer = data.user
    DispalyMDT()
    CreateMobilePhone(0)
    CellCamActivate(true, true)
    takingPicture = true
	CreateThread(function()
        local letSleep = true
        while true do
            Wait(0)
            if IsControlJustPressed(1, 177) and takingPicture == true then
                letSleep = false
                DestroyMobilePhone()
                takingPicture = false
                CellCamActivate(false, false)
                if firstTime == true then 
                    firstTime = false 
                    Wait(2500)
                end
                DispalyMDT()
                break
            end
    
            if IsControlJustPressed(1, 191) and takingPicture == true then
                exports['screenshot-basic']:requestScreenshotUpload(tostring(Config.Webhook), "files[]", function(response)
                    local photo = json.decode(response).attachments[1].proxy_url
                    if data.type == 'avatar' then cachePlayer.avatar = photo elseif data.type == 'banner' then cachePlayer.banner = photo end
                    TriggerServerEvent("nMDT:server-updateProfile", cachePlayer)
                    letSleep = false
                    DestroyMobilePhone()
                    takingPicture = false
                    CellCamActivate(false, false)
                    DispalyMDT()
                    cb(photo)
                end)
                break         
            end
            
            if takingPicture == true then	
                letSleep = false
                HideHudComponentThisFrame(7)
                HideHudComponentThisFrame(8)
                HideHudComponentThisFrame(9)
                HideHudComponentThisFrame(6)
                HideHudComponentThisFrame(19)
                HideHudAndRadarThisFrame()
            end
            ren = GetMobilePhoneRenderId()
            SetTextRenderId(ren)
            SetTextRenderId(1)
            if letSleep then
                Wait(1500)
            end
        end
    end)
end)

RegisterNUICallback("takePictureURL", function(data, cb)
    DispalyMDT()
    CreateMobilePhone(0)
    CellCamActivate(true, true)
    takingPicture = true
	CreateThread(function()
        local letSleep = true
        while true do
            Wait(0)
            if IsControlJustPressed(1, 177) and takingPicture == true then
                letSleep = false
                DestroyMobilePhone()
                takingPicture = false
                CellCamActivate(false, false)
                if firstTime == true then 
                    firstTime = false 
                    Wait(2500)
                end
                DispalyMDT()
                break
            end
    
            if IsControlJustPressed(1, 191) and takingPicture == true then
                exports['screenshot-basic']:requestScreenshotUpload(tostring(Config.Webhook), "files[]", function(response)
                    local photo = json.decode(response).attachments[1].proxy_url
                    letSleep = false
                    DestroyMobilePhone()
                    takingPicture = false
                    CellCamActivate(false, false)
                    DispalyMDT()
                    cb(photo)
                end)
                break         
            end
            
            if takingPicture == true then	
                letSleep = false
                HideHudComponentThisFrame(7)
                HideHudComponentThisFrame(8)
                HideHudComponentThisFrame(9)
                HideHudComponentThisFrame(6)
                HideHudComponentThisFrame(19)
                HideHudAndRadarThisFrame()
            end
            ren = GetMobilePhoneRenderId()
            SetTextRenderId(ren)
            SetTextRenderId(1)
            if letSleep then
                Wait(1500)
            end
        end
    end)
end)

RegisterNUICallback("SetImage", function(data, cb)
    cachePlayer = data.user
    if data.type == 'avatar' then cachePlayer.avatar = data.url elseif data.type == 'banner' then cachePlayer.banner = data.url end
    TriggerServerEvent("nMDT:server-updateProfile", cachePlayer)
end)