/* Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.activiti.engine.impl.persistence.entity;

import org.activiti.engine.management.ActivityStatistics;

public class ActivityStatisticsImpl implements ActivityStatistics {

  protected String id;
  protected int instances;
  protected int failedJobs;
  
  public String getId() {
    return id;
  }
  public void setId(String id) {
    this.id = id;
  }
  public int getInstances() {
    return instances;
  }
  public void setInstances(int instances) {
    this.instances = instances;
  }
  public int getFailedJobs() {
    return failedJobs;
  }
  public void setFailedJobs(int failedJobs) {
    this.failedJobs = failedJobs;
  }
}