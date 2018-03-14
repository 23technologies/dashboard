//
// Copyright 2018 by The Gardener Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

'use strict'

const core = require('../kubernetes').core()
const { registerHandler } = require('./common')

module.exports = io => {
  const labelSelector = 'garden.sapcloud.io/role=project'
  const emitter = core.namespaces.watch({qs: {labelSelector}})
  registerHandler(emitter, event => {
    if (event.type === 'ADDED') {
      const namespace = event.object.metadata.name
      io.of('/shoots').to(namespace).emit('ping')
    }
  })
}
