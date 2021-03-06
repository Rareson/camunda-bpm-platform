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

package org.camunda.bpm.engine.impl;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.camunda.bpm.engine.ProcessEngineException;
import org.camunda.bpm.engine.impl.interceptor.CommandContext;
import org.camunda.bpm.engine.impl.interceptor.CommandExecutor;
import org.camunda.bpm.engine.impl.persistence.entity.SuspensionState;
import org.camunda.bpm.engine.impl.util.ClockUtil;
import org.camunda.bpm.engine.runtime.Job;
import org.camunda.bpm.engine.runtime.JobQuery;


/**
 * @author Joram Barrez
 * @author Tom Baeyens
 * @author Falko Menge
 */
public class JobQueryImpl extends AbstractQuery<JobQuery, Job> implements JobQuery, Serializable {

  private static final long serialVersionUID = 1L;
  protected String id;
  protected String jobDefinitionId;
  protected String processInstanceId;
  protected String executionId;
  protected String processDefinitionId;
  protected String processDefinitionKey;
  protected boolean retriesLeft;
  protected boolean executable;
  protected boolean onlyTimers;
  protected boolean onlyMessages;
  protected Date duedateHigherThan;
  protected Date duedateLowerThan;
  protected Date duedateHigherThanOrEqual;
  protected Date duedateLowerThanOrEqual;
  protected boolean withException;
  protected String exceptionMessage;
  protected boolean noRetriesLeft;
  protected SuspensionState suspensionState;

  public JobQueryImpl() {
  }

  public JobQueryImpl(CommandContext commandContext) {
    super(commandContext);
  }

  public JobQueryImpl(CommandExecutor commandExecutor) {
    super(commandExecutor);
  }

  public JobQuery jobId(String jobId) {
    if (jobId == null) {
      throw new ProcessEngineException("Provided job id is null");
    }
    this.id = jobId;
    return this;
  }

  public JobQuery jobDefinitionId(String jobDefinitionId) {
    if (jobDefinitionId == null) {
      throw new ProcessEngineException("Provided job definition id is null");
    }
    this.jobDefinitionId = jobDefinitionId;
    return this;
  }

  public JobQueryImpl processInstanceId(String processInstanceId) {
    if (processInstanceId == null) {
      throw new ProcessEngineException("Provided process instance id is null");
    }
    this.processInstanceId = processInstanceId;
    return this;
  }

  public JobQueryImpl executionId(String executionId) {
    if (executionId == null) {
      throw new ProcessEngineException("Provided execution id is null");
    }
    this.executionId = executionId;
    return this;
  }

  public JobQuery processDefinitionId(String processDefinitionId) {
    if (processDefinitionId == null) {
      throw new ProcessEngineException("Provided process definition id is null");
    }
    this.processDefinitionId = processDefinitionId;
    return this;
  }

  public JobQuery processDefinitionKey(String processDefinitionKey) {
    if (processDefinitionKey == null) {
      throw new ProcessEngineException("Provided process instance key is null");
    }
    this.processDefinitionKey = processDefinitionKey;
    return this;
  }

  public JobQuery withRetriesLeft() {
    retriesLeft = true;
    return this;
  }

  public JobQuery executable() {
    executable = true;
    return this;
  }

  public JobQuery timers() {
    if (onlyMessages) {
      throw new ProcessEngineException("Cannot combine onlyTimers() with onlyMessages() in the same query");
    }
    this.onlyTimers = true;
    return this;
  }

  public JobQuery messages() {
    if (onlyTimers) {
      throw new ProcessEngineException("Cannot combine onlyTimers() with onlyMessages() in the same query");
    }
    this.onlyMessages = true;
    return this;
  }

  public JobQuery duedateHigherThan(Date date) {
    if (date == null) {
      throw new ProcessEngineException("Provided date is null");
    }
    this.duedateHigherThan = date;
    return this;
  }

  public JobQuery duedateLowerThan(Date date) {
    if (date == null) {
      throw new ProcessEngineException("Provided date is null");
    }
    this.duedateLowerThan = date;
    return this;
  }

  public JobQuery duedateHigherThen(Date date) {
    return duedateHigherThan(date);
  }

  public JobQuery duedateHigherThenOrEquals(Date date) {
    if (date == null) {
      throw new ProcessEngineException("Provided date is null");
    }
    this.duedateHigherThanOrEqual = date;
    return this;
  }

  public JobQuery duedateLowerThen(Date date) {
    return duedateLowerThan(date);
  }

  public JobQuery duedateLowerThenOrEquals(Date date) {
    if (date == null) {
      throw new ProcessEngineException("Provided date is null");
    }
    this.duedateLowerThanOrEqual = date;
    return this;
  }

  public JobQuery withException() {
    this.withException = true;
    return this;
  }

  public JobQuery exceptionMessage(String exceptionMessage) {
    if (exceptionMessage == null) {
      throw new ProcessEngineException("Provided exception message is null");
    }
    this.exceptionMessage = exceptionMessage;
    return this;
  }

  public JobQuery noRetriesLeft() {
    noRetriesLeft = true;
    return this;
  }

  public JobQuery active() {
    suspensionState = SuspensionState.ACTIVE;
    return this;
  }

  public JobQuery suspended() {
    suspensionState = SuspensionState.SUSPENDED;
    return this;
  }

  //sorting //////////////////////////////////////////

  public JobQuery orderByJobDuedate() {
    return orderBy(JobQueryProperty.DUEDATE);
  }

  public JobQuery orderByExecutionId() {
    return orderBy(JobQueryProperty.EXECUTION_ID);
  }

  public JobQuery orderByJobId() {
    return orderBy(JobQueryProperty.JOB_ID);
  }

  public JobQuery orderByProcessInstanceId() {
    return orderBy(JobQueryProperty.PROCESS_INSTANCE_ID);
  }

  public JobQuery orderByProcessDefinitionId() {
    return orderBy(JobQueryProperty.PROCESS_DEFINITION_ID);
  }

  public JobQuery orderByProcessDefinitionKey() {
    return orderBy(JobQueryProperty.PROCESS_DEFINITION_KEY);
  }

  public JobQuery orderByJobRetries() {
    return orderBy(JobQueryProperty.RETRIES);
  }

  //results //////////////////////////////////////////

  public long executeCount(CommandContext commandContext) {
    checkQueryOk();
    return commandContext
      .getJobManager()
      .findJobCountByQueryCriteria(this);
  }

  public List<Job> executeList(CommandContext commandContext, Page page) {
    checkQueryOk();
    return commandContext
      .getJobManager()
      .findJobsByQueryCriteria(this, page);
  }

  //getters //////////////////////////////////////////

  public String getProcessInstanceId() {
    return processInstanceId;
  }
  public String getExecutionId() {
    return executionId;
  }
  public boolean getRetriesLeft() {
    return retriesLeft;
  }
  public boolean getExecutable() {
    return executable;
  }
  public Date getNow() {
    return ClockUtil.getCurrentTime();
  }
  public boolean isWithException() {
    return withException;
  }
  public String getExceptionMessage() {
    return exceptionMessage;
  }

}
