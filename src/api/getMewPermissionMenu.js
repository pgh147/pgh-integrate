export default {
    "code": 200,
    "msg": "成功",
    "data": [{
            "id": "pghsystem_hrmdm",
            "menuCode": "hrmdm",
            "menuName": "组织管理",
            "menuPath": "https://hr-mdm-test.belle.net.cn",
            "systemCode": "pghsystem",
            "sequence": 1,
            "parentId": null,
            "flag": "Y",
            "titleValueVoList": null,
            "blank": "0",
            "hidden": "0",
            "controller": "N",
            "childrenVos": [{
                "id": "pghsystem_orgUnit-manage-L2",
                "menuCode": "orgUnit-manage-L2",
                "menuName": "组织架构管理",
                "menuPath": "",
                "systemCode": "pghsystem",
                "sequence": 1,
                "parentId": "pghsystem_hrmdm",
                "flag": "Y",
                "titleValueVoList": null,
                "blank": "0",
                "hidden": "0",
                "controller": "N",
                "childrenVos": [{
                        "id": "pghsystem_org-adjustment",
                        "menuCode": "org-adjustment",
                        "menuName": "组织调整",
                        "menuPath": "hrmdm/org-adjustment",
                        "systemCode": "pghsystem",
                        "sequence": 1,
                        "parentId": "pghsystem_orgUnit-manage-L2",
                        "flag": "Y",
                        "titleValueVoList": [{
                            "title": "人员调整",
                            "value": "employee-adjust",
                            "status": 1
                        }],
                        "blank": "0",
                        "hidden": "1",
                        "controller": "N",
                        "childrenVos": null,
                        "icon": null,
                        "interfaces": []
                    },
                    {
                        "id": "pghsystem_org-management",
                        "menuCode": "org-management",
                        "menuName": "组织查询",
                        "menuPath": "",
                        "systemCode": "pghsystem",
                        "sequence": 1,
                        "parentId": "pghsystem_orgUnit-manage-L2",
                        "flag": "Y",
                        "titleValueVoList": null,
                        "blank": "0",
                        "hidden": "0",
                        "controller": "N",
                        "childrenVos": null,
                        "icon": null,
                        "interfaces": []
                    },
                    {
                        "id": "pghsystem_org-workorder",
                        "menuCode": "org-workorder",
                        "menuName": "办公组织管理",
                        "menuPath": "hrmdm/org-workorder",
                        "systemCode": "pghsystem",
                        "sequence": 1,
                        "parentId": "pghsystem_orgUnit-manage-L2",
                        "flag": "Y",
                        "titleValueVoList": null,
                        "blank": "0",
                        "hidden": "0",
                        "controller": "N",
                        "childrenVos": null,
                        "icon": null,
                        "interfaces": []
                    },
                    {
                        "id": "pghsystem_org-store",
                        "menuCode": "org-store",
                        "menuName": "店铺组织管理",
                        "menuPath": "hrmdm/org-store",
                        "systemCode": "pghsystem",
                        "sequence": 2,
                        "parentId": "pghsystem_orgUnit-manage-L2",
                        "flag": "Y",
                        "titleValueVoList": null,
                        "blank": "0",
                        "hidden": "0",
                        "controller": "N",
                        "childrenVos": null,
                        "icon": null,
                        "interfaces": []
                    }
                ],
                "icon": null,
                "interfaces": []
            }],
            "icon": "IconHorizontalArchitecture",
            "interfaces": []
        },
        {
            "id": "pghsystem_RecruitmentManagement",
            "menuCode": "RecruitmentManagement",
            "menuName": "招聘管理",
            "menuPath": "",
            "systemCode": "pghsystem",
            "sequence": 2,
            "parentId": null,
            "flag": "Y",
            "titleValueVoList": null,
            "blank": "0",
            "hidden": "0",
            "controller": "N",
            "childrenVos": [{
                    "id": "pghsystem_DemandManager",
                    "menuCode": "DemandManager",
                    "menuName": "需求管理",
                    "menuPath": null,
                    "systemCode": "pghsystem",
                    "sequence": 1,
                    "parentId": "pghsystem_RecruitmentManagement",
                    "flag": "Y",
                    "titleValueVoList": null,
                    "blank": "0",
                    "hidden": "0",
                    "controller": "N",
                    "childrenVos": null,
                    "icon": null,
                    "interfaces": []
                },
                {
                    "id": "pghsystem_null",
                    "menuCode": null,
                    "menuName": "iframe页面",
                    "menuPath": "http://new-bi.belle.net.cn/webroot/decision/link/rXZD",
                    "systemCode": "pghsystem",
                    "sequence": 1,
                    "parentId": "pghsystem_RecruitmentManagement",
                    "flag": "Y",
                    "titleValueVoList": null,
                    "blank": "0",
                    "hidden": "0",
                    "controller": "N",
                    "childrenVos": null,
                    "icon": null,
                    "interfaces": []
                },
                {
                    "id": "pghsystem_PositionManager",
                    "menuCode": "PositionManager",
                    "menuName": "职位管理",
                    "menuPath": null,
                    "systemCode": "pghsystem",
                    "sequence": 2,
                    "parentId": "pghsystem_RecruitmentManagement",
                    "flag": "Y",
                    "titleValueVoList": null,
                    "blank": "0",
                    "hidden": "0",
                    "controller": "N",
                    "childrenVos": null,
                    "icon": null,
                    "interfaces": []
                },
                {
                    "id": "pghsystem_ResumeManager",
                    "menuCode": "ResumeManager",
                    "menuName": "候选人管理",
                    "menuPath": null,
                    "systemCode": "pghsystem",
                    "sequence": 3,
                    "parentId": "pghsystem_RecruitmentManagement",
                    "flag": "Y",
                    "titleValueVoList": null,
                    "blank": "0",
                    "hidden": "0",
                    "controller": "N",
                    "childrenVos": null,
                    "icon": null,
                    "interfaces": []
                },
                {
                    "id": "pghsystem_InterviewManager",
                    "menuCode": "InterviewManager",
                    "menuName": "面试管理",
                    "menuPath": null,
                    "systemCode": "pghsystem",
                    "sequence": 4,
                    "parentId": "pghsystem_RecruitmentManagement",
                    "flag": "Y",
                    "titleValueVoList": null,
                    "blank": "0",
                    "hidden": "0",
                    "controller": "N",
                    "childrenVos": null,
                    "icon": null,
                    "interfaces": []
                },
                {
                    "id": "pghsystem_EmploymentManager",
                    "menuCode": "EmploymentManager",
                    "menuName": "录用管理",
                    "menuPath": null,
                    "systemCode": "pghsystem",
                    "sequence": 5,
                    "parentId": "pghsystem_RecruitmentManagement",
                    "flag": "Y",
                    "titleValueVoList": null,
                    "blank": "0",
                    "hidden": "0",
                    "controller": "N",
                    "childrenVos": null,
                    "icon": null,
                    "interfaces": []
                },
                {
                    "id": "pghsystem_HumenMangager3",
                    "menuCode": "HumenMangager3",
                    "menuName": "人才库",
                    "menuPath": "http://www.hao123.com",
                    "systemCode": "pghsystem",
                    "sequence": 6,
                    "parentId": "pghsystem_RecruitmentManagement",
                    "flag": "Y",
                    "titleValueVoList": null,
                    "blank": "0",
                    "hidden": "0",
                    "controller": "N",
                    "childrenVos": null,
                    "icon": null,
                    "interfaces": []
                }
            ],
            "icon": "",
            "interfaces": []
        },
        {
            "id": "pghsystem_human-manage",
            "menuCode": "human-manage",
            "menuName": "人事管理",
            "menuPath": "",
            "systemCode": "pghsystem",
            "sequence": 3,
            "parentId": null,
            "flag": "Y",
            "titleValueVoList": null,
            "blank": "0",
            "hidden": "0",
            "controller": "N",
            "childrenVos": [{
                    "id": "pghsystem_lzgl",
                    "menuCode": "lzgl",
                    "menuName": "离职管理",
                    "menuPath": null,
                    "systemCode": "pghsystem",
                    "sequence": 1,
                    "parentId": "pghsystem_human-manage",
                    "flag": "Y",
                    "titleValueVoList": null,
                    "blank": "0",
                    "hidden": "0",
                    "controller": "N",
                    "childrenVos": [{
                            "id": "pghsystem_blackListManage",
                            "menuCode": "blackListManage",
                            "menuName": "黑名单管理",
                            "menuPath": "hr-dimission/blackListManage",
                            "systemCode": "pghsystem",
                            "sequence": 1,
                            "parentId": "pghsystem_lzgl",
                            "flag": "Y",
                            "titleValueVoList": [{
                                    "title": "新增",
                                    "value": "add",
                                    "status": 1
                                },
                                {
                                    "title": "删除",
                                    "value": "delete",
                                    "status": 1
                                },
                                {
                                    "title": "编辑",
                                    "value": "update",
                                    "status": 1
                                },
                                {
                                    "title": "导出",
                                    "value": "export",
                                    "status": 1
                                },
                                {
                                    "title": "撤销黑名单",
                                    "value": "edit",
                                    "status": 1
                                }
                            ],
                            "blank": "0",
                            "hidden": "0",
                            "controller": "N",
                            "childrenVos": null,
                            "icon": null,
                            "interfaces": []
                        },
                        {
                            "id": "pghsystem_leaveEmployeeManage",
                            "menuCode": "toleavelist",
                            "menuName": "待离职员工",
                            "menuPath": "hr-dimission/toleavelist",
                            "systemCode": "pghsystem",
                            "sequence": 2,
                            "parentId": "pghsystem_lzgl",
                            "flag": "Y",
                            "titleValueVoList": [{
                                    "title": "新增",
                                    "value": "add",
                                    "status": 1
                                },
                                {
                                    "title": "删除",
                                    "value": "delete",
                                    "status": 1
                                },
                                {
                                    "title": "编辑",
                                    "value": "update",
                                    "status": 1
                                },
                                {
                                    "title": "导出",
                                    "value": "export",
                                    "status": 1
                                },
                                {
                                    "title": "待申请",
                                    "value": "applayForLeave",
                                    "status": 1
                                },
                                {
                                    "title": "导入",
                                    "value": "important",
                                    "status": 1
                                },
                                {
                                    "title": "权限回收",
                                    "value": "recoveryAuth",
                                    "status": 1
                                },
                                {
                                    "title": "加入黑名单",
                                    "value": "addBlack",
                                    "status": 1
                                }
                            ],
                            "blank": "0",
                            "hidden": "0",
                            "controller": "N",
                            "childrenVos": null,
                            "icon": null,
                            "interfaces": []
                        },
                        {
                            "id": "pghsystem_leaveEmployeeManage01",
                            "menuCode": "leaveEmployeeManage01",
                            "menuName": "离职人员管理",
                            "menuPath": "hr-dimission/leaveEmployeeManage",
                            "systemCode": "pghsystem",
                            "sequence": 2,
                            "parentId": "pghsystem_lzgl",
                            "flag": "Y",
                            "titleValueVoList": [{
                                    "title": "新增",
                                    "value": "add",
                                    "status": 1
                                },
                                {
                                    "title": "删除",
                                    "value": "delete",
                                    "status": 1
                                },
                                {
                                    "title": "编辑",
                                    "value": "update",
                                    "status": 1
                                },
                                {
                                    "title": "导出",
                                    "value": "export",
                                    "status": 1
                                }
                            ],
                            "blank": "0",
                            "hidden": "0",
                            "controller": "N",
                            "childrenVos": null,
                            "icon": null,
                            "interfaces": []
                        },
                        {
                            "id": "pghsystem_permissionRecovery",
                            "menuCode": "permissionRecovery",
                            "menuName": "权限回收事项",
                            "menuPath": "hr-dimission/permissionRecovery",
                            "systemCode": "pghsystem",
                            "sequence": 3,
                            "parentId": "pghsystem_lzgl",
                            "flag": "Y",
                            "titleValueVoList": [{
                                    "title": "新增",
                                    "value": "add",
                                    "status": 1
                                },
                                {
                                    "title": "删除",
                                    "value": "delete",
                                    "status": 1
                                },
                                {
                                    "title": "编辑",
                                    "value": "update",
                                    "status": 1
                                },
                                {
                                    "title": "导出",
                                    "value": "export",
                                    "status": 1
                                }
                            ],
                            "blank": "0",
                            "hidden": "0",
                            "controller": "N",
                            "childrenVos": null,
                            "icon": null,
                            "interfaces": []
                        },
                        {
                            "id": "pghsystem_processLook",
                            "menuCode": "processLook",
                            "menuName": "流程查看",
                            "menuPath": "hr-dimission/processLook",
                            "systemCode": "pghsystem",
                            "sequence": 4,
                            "parentId": "pghsystem_lzgl",
                            "flag": "Y",
                            "titleValueVoList": [{
                                    "title": "新增",
                                    "value": "add",
                                    "status": 1
                                },
                                {
                                    "title": "删除",
                                    "value": "delete",
                                    "status": 1
                                },
                                {
                                    "title": "编辑",
                                    "value": "update",
                                    "status": 1
                                },
                                {
                                    "title": "导出",
                                    "value": "export",
                                    "status": 1
                                },
                                {
                                    "title": "查看",
                                    "value": "look",
                                    "status": 1
                                }
                            ],
                            "blank": "0",
                            "hidden": "0",
                            "controller": "N",
                            "childrenVos": null,
                            "icon": null,
                            "interfaces": []
                        },
                        {
                            "id": "pghsystem_recoveryTable",
                            "menuCode": "recoveryTable",
                            "menuName": "权限回收人员表",
                            "menuPath": "hr-dimission/recoveryTable",
                            "systemCode": "pghsystem",
                            "sequence": 5,
                            "parentId": "pghsystem_lzgl",
                            "flag": "Y",
                            "titleValueVoList": [{
                                    "title": "新增",
                                    "value": "add",
                                    "status": 1
                                },
                                {
                                    "title": "删除",
                                    "value": "delete",
                                    "status": 1
                                },
                                {
                                    "title": "编辑",
                                    "value": "update",
                                    "status": 1
                                },
                                {
                                    "title": "导出",
                                    "value": "export",
                                    "status": 1
                                },
                                {
                                    "title": "查看",
                                    "value": "look",
                                    "status": 1
                                },
                                {
                                    "title": "修改",
                                    "value": "edit",
                                    "status": 1
                                }
                            ],
                            "blank": "0",
                            "hidden": "0",
                            "controller": "N",
                            "childrenVos": null,
                            "icon": null,
                            "interfaces": []
                        }
                    ],
                    "icon": null,
                    "interfaces": []
                },
                {
                    "id": "pghsystem_employee-manage",
                    "menuCode": "employee-manage",
                    "menuName": "员工管理",
                    "menuPath": "",
                    "systemCode": "pghsystem",
                    "sequence": 1,
                    "parentId": "pghsystem_human-manage",
                    "flag": "Y",
                    "titleValueVoList": null,
                    "blank": "0",
                    "hidden": "0",
                    "controller": "N",
                    "childrenVos": [{
                            "id": "pghsystem_employee-info",
                            "menuCode": "employee-info",
                            "menuName": "员工信息",
                            "menuPath": "hrmdm/org-employee",
                            "systemCode": "pghsystem",
                            "sequence": 1,
                            "parentId": "pghsystem_employee-manage",
                            "flag": "Y",
                            "titleValueVoList": [{
                                    "title": "新增",
                                    "value": "add",
                                    "status": 1
                                },
                                {
                                    "title": "编辑",
                                    "value": "update",
                                    "status": 1
                                },
                                {
                                    "title": "导出",
                                    "value": "export",
                                    "status": 1
                                }
                            ],
                            "blank": "0",
                            "hidden": "0",
                            "controller": "N",
                            "childrenVos": null,
                            "icon": "",
                            "interfaces": []
                        },
                        {
                            "id": "pghsystem_employee-parttime-job",
                            "menuCode": "employee-parttime-job",
                            "menuName": "兼岗查询 ",
                            "menuPath": "hrmdm/parttime-job",
                            "systemCode": "pghsystem",
                            "sequence": 2,
                            "parentId": "pghsystem_employee-manage",
                            "flag": "Y",
                            "titleValueVoList": null,
                            "blank": "0",
                            "hidden": "0",
                            "controller": "N",
                            "childrenVos": null,
                            "icon": null,
                            "interfaces": []
                        }
                    ],
                    "icon": null,
                    "interfaces": []
                },
                {
                    "id": "pghsystem_entry",
                    "menuCode": "entry",
                    "menuName": "入职管理",
                    "menuPath": null,
                    "systemCode": "pghsystem",
                    "sequence": 1,
                    "parentId": "pghsystem_human-manage",
                    "flag": "Y",
                    "titleValueVoList": null,
                    "blank": "0",
                    "hidden": "0",
                    "controller": "N",
                    "childrenVos": [{
                        "id": "pghsystem_entryManage ",
                        "menuCode": "entryManage ",
                        "menuName": "入职管理",
                        "menuPath": "hr-entry/entryManage",
                        "systemCode": "pghsystem",
                        "sequence": 1,
                        "parentId": "pghsystem_entry",
                        "flag": "Y",
                        "titleValueVoList": null,
                        "blank": "0",
                        "hidden": "0",
                        "controller": "N",
                        "childrenVos": null,
                        "icon": null,
                        "interfaces": []
                    }],
                    "icon": null,
                    "interfaces": []
                }
            ],
            "icon": "IconAddUsers",
            "interfaces": []
        },
        {
            "id": "pghsystem_hr-report",
            "menuCode": "hr-report",
            "menuName": "报表中心",
            "menuPath": "https://office-data-imports-tool-test.belle.net.cn/",
            "systemCode": "pghsystem",
            "sequence": 4,
            "parentId": null,
            "flag": "Y",
            "titleValueVoList": null,
            "blank": "0",
            "hidden": "0",
            "controller": "N",
            "childrenVos": [{
                    "id": "pghsystem_ats-report",
                    "menuCode": "ats-report",
                    "menuName": "考勤报表",
                    "menuPath": null,
                    "systemCode": "pghsystem",
                    "sequence": 1,
                    "parentId": "pghsystem_hr-report",
                    "flag": "Y",
                    "titleValueVoList": null,
                    "blank": "0",
                    "hidden": "0",
                    "controller": "N",
                    "childrenVos": [{
                        "id": "pghsystem_home",
                        "menuCode": "home",
                        "menuName": "科技中心",
                        "menuPath": "https://new-bi.belle.net.cn/webroot/decision/link/EUrW",
                        "systemCode": "pghsystem",
                        "sequence": 1,
                        "parentId": "pghsystem_ats-report",
                        "flag": "Y",
                        "titleValueVoList": null,
                        "blank": "0",
                        "hidden": "0",
                        "controller": "N",
                        "childrenVos": null,
                        "icon": null,
                        "interfaces": []
                    }],
                    "icon": null,
                    "interfaces": []
                },
                {
                    "id": "pghsystem_/employeeRoster",
                    "menuCode": "employeeRoster",
                    "menuName": "员工花名册",
                    "menuPath": "hr-personnel/employeeRoster",
                    "systemCode": "pghsystem",
                    "sequence": 2,
                    "parentId": "pghsystem_hr-report",
                    "flag": "Y",
                    "titleValueVoList": [{
                            "title": "新增",
                            "value": "add",
                            "status": 1
                        },
                        {
                            "title": "删除",
                            "value": "delete",
                            "status": 1
                        },
                        {
                            "title": "编辑",
                            "value": "update",
                            "status": 1
                        },
                        {
                            "title": "导出",
                            "value": "export",
                            "status": 1
                        }
                    ],
                    "blank": "0",
                    "hidden": "0",
                    "controller": "N",
                    "childrenVos": null,
                    "icon": null,
                    "interfaces": []
                },
                {
                    "id": "pghsystem_import-tool",
                    "menuCode": "import-tool",
                    "menuName": "导入工具",
                    "menuPath": null,
                    "systemCode": "pghsystem",
                    "sequence": 3,
                    "parentId": "pghsystem_hr-report",
                    "flag": "Y",
                    "titleValueVoList": null,
                    "blank": "0",
                    "hidden": "0",
                    "controller": "N",
                    "childrenVos": [{
                        "id": "pghsystem_saryTheme",
                        "menuCode": "saryTheme",
                        "menuName": "人事薪酬主题",
                        "menuPath": "hr-report/DataImport",
                        "systemCode": "pghsystem",
                        "sequence": 1,
                        "parentId": "pghsystem_import-tool",
                        "flag": "Y",
                        "titleValueVoList": null,
                        "blank": "0",
                        "hidden": "0",
                        "controller": "N",
                        "childrenVos": null,
                        "icon": null,
                        "interfaces": []
                    }],
                    "icon": null,
                    "interfaces": []
                },
                {
                    "id": "pghsystem_personAnalysis",
                    "menuCode": "personAnalysis",
                    "menuName": "人力成本分析",
                    "menuPath": null,
                    "systemCode": "pghsystem",
                    "sequence": 4,
                    "parentId": "pghsystem_hr-report",
                    "flag": "Y",
                    "titleValueVoList": null,
                    "blank": "0",
                    "hidden": "0",
                    "controller": "N",
                    "childrenVos": [{
                            "id": "pghsystem_OfficeEmpBaseInfo",
                            "menuCode": "OfficeEmpBaseInfo",
                            "menuName": "办公室薪酬基础表",
                            "menuPath": "hr-report/ImportListOffice",
                            "systemCode": "pghsystem",
                            "sequence": 1,
                            "parentId": "pghsystem_personAnalysis",
                            "flag": "Y",
                            "titleValueVoList": [{
                                "title": "浏览",
                                "value": "browse",
                                "status": 1
                            }],
                            "blank": "0",
                            "hidden": "0",
                            "controller": "N",
                            "childrenVos": null,
                            "icon": null,
                            "interfaces": []
                        },
                        {
                            "id": "pghsystem_storeEmpBaseInfo",
                            "menuCode": "storeEmpBaseInfo",
                            "menuName": "店铺薪酬基础表",
                            "menuPath": "hr-report/ImportList",
                            "systemCode": "pghsystem",
                            "sequence": 2,
                            "parentId": "pghsystem_personAnalysis",
                            "flag": "Y",
                            "titleValueVoList": [{
                                "title": "浏览",
                                "value": "browse",
                                "status": 1
                            }],
                            "blank": "0",
                            "hidden": "0",
                            "controller": "N",
                            "childrenVos": null,
                            "icon": null,
                            "interfaces": []
                        }
                    ],
                    "icon": null,
                    "interfaces": []
                }
            ],
            "icon": "",
            "interfaces": []
        },
        {
            "id": "pghsystem_systemadmin",
            "menuCode": "systemadmin",
            "menuName": "系统管理",
            "menuPath": "",
            "systemCode": "pghsystem",
            "sequence": 5,
            "parentId": null,
            "flag": "Y",
            "titleValueVoList": null,
            "blank": "0",
            "hidden": "0",
            "controller": "N",
            "childrenVos": [{
                "id": "pghsystem_hrmdmmanage",
                "menuCode": "hrmdmmanage",
                "menuName": "HRMDM系统",
                "menuPath": "",
                "systemCode": "pghsystem",
                "sequence": 1,
                "parentId": "pghsystem_systemadmin",
                "flag": "Y",
                "titleValueVoList": null,
                "blank": "0",
                "hidden": "0",
                "controller": "N",
                "childrenVos": [{
                        "id": "pghsystem_dictionary-maintenance",
                        "menuCode": "dictionary-maintenance",
                        "menuName": "数据字典",
                        "menuPath": "hrmdm/dictionary-maintenance",
                        "systemCode": "pghsystem",
                        "sequence": 1,
                        "parentId": "pghsystem_hrmdmmanage",
                        "flag": "Y",
                        "titleValueVoList": null,
                        "blank": "0",
                        "hidden": "0",
                        "controller": "N",
                        "childrenVos": null,
                        "icon": null,
                        "interfaces": []
                    },
                    {
                        "id": "pghsystem_employee-operate-log",
                        "menuCode": "employee-operate-log",
                        "menuName": "员工日志操作",
                        "menuPath": "hrmdm/employee-operate-log",
                        "systemCode": "pghsystem",
                        "sequence": 1,
                        "parentId": "pghsystem_hrmdmmanage",
                        "flag": "Y",
                        "titleValueVoList": null,
                        "blank": "0",
                        "hidden": "0",
                        "controller": "N",
                        "childrenVos": null,
                        "icon": null,
                        "interfaces": []
                    },
                    {
                        "id": "pghsystem_message-subscribe",
                        "menuCode": "message-subscribe",
                        "menuName": "数据下发消息订阅",
                        "menuPath": "hrmdm/message-subscribe",
                        "systemCode": "pghsystem",
                        "sequence": 1,
                        "parentId": "pghsystem_hrmdmmanage",
                        "flag": "Y",
                        "titleValueVoList": null,
                        "blank": "0",
                        "hidden": "0",
                        "controller": "N",
                        "childrenVos": null,
                        "icon": null,
                        "interfaces": []
                    },
                    {
                        "id": "pghsystem_org-async-task",
                        "menuCode": "org-async-task",
                        "menuName": "异步任务管理",
                        "menuPath": "hrmdm/async-task",
                        "systemCode": "pghsystem",
                        "sequence": 1,
                        "parentId": "pghsystem_hrmdmmanage",
                        "flag": "Y",
                        "titleValueVoList": null,
                        "blank": "0",
                        "hidden": "0",
                        "controller": "N",
                        "childrenVos": null,
                        "icon": null,
                        "interfaces": []
                    },
                    {
                        "id": "pghsystem_org-store-unit-rule",
                        "menuCode": "org-store-unit-rule",
                        "menuName": "店铺组织规则",
                        "menuPath": "hrmdm/org-store-unit-rule",
                        "systemCode": "pghsystem",
                        "sequence": 1,
                        "parentId": "pghsystem_hrmdmmanage",
                        "flag": "Y",
                        "titleValueVoList": null,
                        "blank": "0",
                        "hidden": "0",
                        "controller": "N",
                        "childrenVos": null,
                        "icon": null,
                        "interfaces": []
                    },
                    {
                        "id": "pghsystem_sending-message",
                        "menuCode": "sending-message",
                        "menuName": "消息发送",
                        "menuPath": "hrmdm/message-send",
                        "systemCode": "pghsystem",
                        "sequence": 1,
                        "parentId": "pghsystem_hrmdmmanage",
                        "flag": "Y",
                        "titleValueVoList": null,
                        "blank": "0",
                        "hidden": "0",
                        "controller": "N",
                        "childrenVos": null,
                        "icon": null,
                        "interfaces": []
                    }
                ],
                "icon": null,
                "interfaces": []
            }],
            "icon": "",
            "interfaces": []
        }
    ]
}