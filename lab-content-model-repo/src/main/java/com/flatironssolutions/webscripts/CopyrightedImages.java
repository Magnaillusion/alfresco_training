/*
 * Copyright (c) 2014, Flatirons Solutions, Inc. All Rights Reserved.
 */

package com.flatironssolutions.webscripts;

import java.io.IOException;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.extensions.webscripts.AbstractWebScript;
import org.springframework.extensions.webscripts.WebScriptException;
import org.springframework.extensions.webscripts.WebScriptRequest;
import org.springframework.extensions.webscripts.WebScriptResponse;

import org.alfresco.model.ContentModel;
import org.alfresco.repo.model.Repository;
import org.alfresco.service.ServiceRegistry;
import org.alfresco.service.cmr.repository.ChildAssociationRef;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeService;
import org.alfresco.service.cmr.security.PersonService.PersonInfo;
import org.alfresco.service.namespace.QName;


/**
 * @author fsdev
 *
 */
public class CopyrightedImages extends AbstractWebScript {

    private ServiceRegistry registry;
    private Repository repository;

    private static final QName ASPECT_COPYRIGHTED = QName.createQName("http://www.flatironssolutions.com/model/fsctraining/1.0", "copyrighted");
    private static final QName PROP_COPYRIGHT = QName.createQName("http://www.flatironssolutions.com/model/fsctraining/1.0", "copyright");

    public void setRegistry(final ServiceRegistry value) {
        registry = value;
    }

    public void setRepository(final Repository value) {
        repository = value;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void execute(final WebScriptRequest req, final WebScriptResponse res) throws IOException {
        try {
            JSONObject jsonObject = new JSONObject();

            NodeRef person = repository.getPerson();
            PersonInfo personInfo = registry.getPersonService().getPerson(person);

            NodeService nodeService = registry.getNodeService();
            NodeRef userhome = repository.getUserHome(person);
            jsonObject.put("userhome", nodeService.getPath(userhome));

            JSONArray picturesArray  = new JSONArray();

            NodeRef pictures = nodeService.getChildByName(userhome, ContentModel.ASSOC_CONTAINS, "pictures");

            if(pictures != null) {
                List<ChildAssociationRef> children = nodeService.getChildAssocs(pictures);

                for(ChildAssociationRef child : children) {
                    NodeRef picture = child.getChildRef();
                    if(nodeService.hasAspect(picture, ASPECT_COPYRIGHTED)) {
                        JSONObject jsonPicture = new JSONObject();
                        jsonPicture.put("name", nodeService.getProperty(picture, ContentModel.PROP_NAME));
                        jsonPicture.put("copyright", nodeService.getProperty(picture, PROP_COPYRIGHT));
                        jsonPicture.put("noderef", picture.toString());
                        picturesArray.put(jsonPicture);
                    }
                }
            }
            jsonObject.put("pictures", picturesArray);
            res.getWriter().write(jsonObject.toString());
        }

        catch (JSONException e) {
            throw new WebScriptException("Unable to serialize JSON");
        }
    }

}
