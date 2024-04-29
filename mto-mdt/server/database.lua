Database = {}

---@param text string
---@param ... unknown
Database.Debug = function(text, ...)
    print(('^1[DEBUG]^7 %s^7'):format((text):format(...)))
end

---@param callback function
---@param ... unknown
Database.TriggerCallback = function(callback, ...)
    if callback then
        callback(...)
    end
end

---@param collection string
---@param table table
---@param callback function
Database.InsertTableToCollection = function(collection, table, callback)
    local Collection = LoadResourceFile(GetCurrentResourceName(), ('collections/%s.json'):format(collection))
    if not Collection then
        Database.Debug('Collection %s does not exist.', collection)
    else
        local CollectionData = json.decode(Collection)
        CollectionData[#CollectionData+1] = table
        SaveResourceFile(GetCurrentResourceName(), ('collections/%s.json'):format(collection), json.encode(CollectionData, {indent = true}))
    end
end

---@param collection string
---@param query table
---@param callback function
Database.DeleteTableToCollection = function(collection, query, callback)
    local Collection = LoadResourceFile(GetCurrentResourceName(), ('collections/%s.json'):format(collection))
    if not Collection then
        Database.Debug('Collection %s does not exist.', collection)
        Database.TriggerCallback(callback, false)
    else
        local CollectionData = json.decode(Collection)
        if query then
            local QueryData = {}
            for k, v in pairs(CollectionData) do
                local retval = true
                for _, i in pairs(query) do
                    if v[_] ~= i then
                        retval = false
                    end
                end
                if not retval then
                    QueryData[#QueryData+1] = v
                end
            end
            ---@diagnostic disable-next-line: missing-parameter
            SaveResourceFile(GetCurrentResourceName(), ('collections/%s.json'):format(collection), json.encode(QueryData, {indent = true}))
            Database.TriggerCallback(callback, true)
        else
            Database.Debug('Query is empty.', collection)
            Database.TriggerCallback(callback, false)
        end
    end
end

---@param collection string
---@param query table
---@param update table
---@param callback function
Database.UpdateTableToCollection = function(collection, query, update, callback)
    local Collection = LoadResourceFile(GetCurrentResourceName(), ('collections/%s.json'):format(collection))
    if not Collection then
        Database.Debug('Collection %s does not exist.', collection)
    else
        local CollectionData = json.decode(Collection)
        if query then
            for k, v in pairs(CollectionData) do
                local retval = true
                for _, i in pairs(query) do
                    if v[_] ~= i then
                        retval = false
                    end
                end
                if retval then
                    for _, i in pairs(update) do
                        v[_] = i
                    end
                end
            end
            ---@diagnostic disable-next-line: missing-parameter
            SaveResourceFile(GetCurrentResourceName(), ('collections/%s.json'):format(collection), json.encode(CollectionData, {indent = true}))
        else
            Database.Debug('Query is empty.', collection)
        end
    end
end

---@param collection string
---@param query table
Database.GetTableToCollection = function(collection, query)
    local promise = promise.new()

    local Collection = LoadResourceFile(GetCurrentResourceName(), ('collections/%s.json'):format(collection))
    if not Collection then
        Database.Debug('Collection %s does not exist.', collection)
        promise:reject({ err = ('Collection %s does not exist.'):format(collection) })
    else
        local QueryData = {}
        local CollectionData = json.decode(Collection)
        if query then
            for k, v in pairs(CollectionData) do
                local retval = true
                for _, i in pairs(query) do
                    if v[_] ~= i then
                        retval = false
                    end
                end
                if retval then
                    QueryData[#QueryData+1] = v
                end
            end
        else
            QueryData = CollectionData
        end
        print(QueryData)
        promise:resolve(QueryData)
    end

    local response = Citizen.Await(promise)
    return response
end

---@param collection string
---@param query table
Database.GetCollection = function(collection)
    local promise = promise.new()

    local Collection = LoadResourceFile(GetCurrentResourceName(), ('collections/%s.json'):format(collection))
    if not Collection then
        Database.Debug('Collection %s does not exist.', collection)
        promise:reject({ err = ('Collection %s does not exist.'):format(collection) })
    else
        local CollectionData = json.decode(Collection)
        promise:resolve(CollectionData)
    end

    local response = Citizen.Await(promise)
    return response
end