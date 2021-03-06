package com.flatironssolutions.workflow;

import java.util.List;

import org.activiti.engine.delegate.DelegateExecution;
import org.alfresco.service.ServiceRegistry;
import org.alfresco.service.cmr.repository.ChildAssociationRef;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeService;
import org.alfresco.service.cmr.workflow.WorkflowInstance;
import org.alfresco.service.cmr.workflow.WorkflowService;
import org.alfresco.service.namespace.QName;

class AddCopyright extends org.alfresco.repo.workflow.activiti.BaseJavaDelegate {
	private static final QName TYPE_IMAGE = QName.createQName("http://www.flatironssolutions.com/model/fsctraining/1.0", "image");
	private static final QName ASPECT_COPYRIGHTED = QName.createQName("http://www.flatironssolutions.com/model/fsctraining/1.0", "copyrighted");
	private static final QName PROP_IMAGE_SOURCE = QName.createQName("http://www.flatironssolutions.com/model/fsctraining/1.0", "imageSource");
	private static final QName PROP_COPYRIGHT = QName.createQName("http://www.flatironssolutions.com/model/fsctraining/1.0", "copyright");

	@Override
	public void execute(DelegateExecution execution) throws Exception {
		ServiceRegistry registry = getServiceRegistry();
		WorkflowService workflowService = registry.getWorkflowService();
		NodeService nodeService = registry.getNodeService();

		String imageSource = (String) execution.getVariable("fscwf_imageSource");
		String copyright = (String) execution.getVariable("fscwf_copyright");
		String workflowInstanceId = (String) execution.getVariable("workflowinstanceid");

		WorkflowInstance workflowInstance = workflowService.getWorkflowById(workflowInstanceId);
		NodeRef workflowPackage = workflowInstance.getWorkflowPackage();
		List<ChildAssociationRef> workflowContents = nodeService.getChildAssocs(workflowPackage);

		if (workflowContents != null) {
			for (ChildAssociationRef child : workflowContents) {
					NodeRef picture = child.getChildRef();

					if (!nodeService.hasAspect(picture, ASPECT_COPYRIGHTED)) {
						nodeService.addAspect(picture, ASPECT_COPYRIGHTED, null);
					}

					if (!nodeService.getType(picture).equals(TYPE_IMAGE)) {
						nodeService.setType(picture, TYPE_IMAGE);
					}

					nodeService.setProperty(picture, PROP_IMAGE_SOURCE, imageSource);
					nodeService.setProperty(picture, PROP_COPYRIGHT, copyright);
			}
		}
	}
}