if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$a = {
    data() {
      return {
        images: [
          "/static/index/swiper_photo/1.jpg",
          "/static/index/swiper_photo/2.jpg",
          "/static/index/swiper_photo/3.jpg"
        ],
        newsList: [
          {
            title: "北京邮电大学官方网站",
            url: "https://www.bupt.edu.cn",
            image: "/static/index/link_photo/photo1.png",
            description: "网址：https://www.bupt.edu.cn"
            // Added description
          },
          {
            title: "北邮校内VPN系统",
            url: "http://webvpn.bupt.edu.cn",
            image: "/static/index/link_photo/photo2.png",
            description: "网址：http://webvpn.bupt.edu.cn"
            // Added description
          },
          {
            title: "北京邮电大学教学云平台",
            url: "http://ucloud.bupt.edu.cn",
            image: "/static/index/link_photo/photo3.png",
            description: "网址：http://ucloud.bupt.edu.cn"
            // Added description
          }
        ]
      };
    },
    methods: {
      goToUrl(url) {
        uni.navigateTo({
          url: "/pages/webview/webview?url=" + encodeURIComponent(url)
        });
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("swiper", {
        autoplay: true,
        interval: 3e3,
        circular: true,
        "indicator-dots": true,
        class: "swiper"
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.images, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("swiper-item", { key: index }, [
              vue.createElementVNode("image", {
                src: item,
                class: "swiper-img",
                mode: "aspectFill"
              }, null, 8, ["src"])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createCommentVNode(" 新闻栏 "),
      vue.createElementVNode("view", { class: "news-container" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.newsList, (news, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: index,
              class: "news-item",
              onClick: ($event) => $options.goToUrl(news.url)
            }, [
              vue.createElementVNode("view", { class: "news-content" }, [
                vue.createElementVNode(
                  "text",
                  { class: "news-title" },
                  vue.toDisplayString(news.title),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("image", {
                  src: news.image,
                  class: "news-image",
                  mode: "aspectFill"
                }, null, 8, ["src"])
              ]),
              vue.createElementVNode(
                "view",
                { class: "news-description" },
                vue.toDisplayString(news.description),
                1
                /* TEXT */
              ),
              vue.createCommentVNode(" Added ")
            ], 8, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__scopeId", "data-v-1cf27b2a"], ["__file", "C:/Users/lenovo/Desktop/HBuilderX/Project/app/项目/pages/index/index.vue"]]);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const recorderManager$2 = uni.getRecorderManager();
  const innerAudioContext$4 = uni.createInnerAudioContext();
  const url_ask_voice$1 = "http://10.21.198.127:8000/history/ask/voice";
  const url_send_text$1 = "http://10.21.198.127:8000/change/text";
  const url_download_audio$1 = "http://10.21.198.127:8000/change/voice/voice.mp3";
  const url_ask_text$1 = "http://10.21.198.127:8000/history/ask/text";
  const _sfc_main$9 = {
    data() {
      return {
        messages: [],
        // 存储聊天消息
        newMessage: "",
        // 当前输入的消息
        isRecording: false,
        // 是否正在录音
        voicePath: ""
        // 存储语音文件路径
      };
    },
    onLoad() {
      innerAudioContext$4.autoplay = true;
      const self = this;
      recorderManager$2.onStop(function(res) {
        formatAppLog("log", "at pages/chat/chat.vue:47", "recorder stop", res);
        self.voicePath = res.tempFilePath;
      });
    },
    computed: {
      voiceInputText() {
        return this.isRecording ? "录音中" : "语音";
      }
    },
    methods: {
      goDetail() {
        uni.navigateTo({
          url: "/pages/detail/detail"
        });
      },
      goVoiceChat() {
        uni.navigateTo({
          url: "/pages/voiceChat/voiceChat"
        });
      },
      receiveMessage(text) {
        this.messages.push({
          type: "receive",
          content: text
        });
      },
      receiveAnswer(text) {
        return new Promise((resolve, reject) => {
          uni.request({
            url: url_ask_text$1,
            method: "POST",
            header: {
              "Content-Type": "application/json"
            },
            data: {
              text
              // 发送消息内容到服务器
            },
            success: (res) => {
              formatAppLog("log", "at pages/chat/chat.vue:86", "文本已发送到服务器");
              const ans = res.data;
              resolve(ans);
            },
            fail: (err) => {
              formatAppLog("error", "at pages/chat/chat.vue:91", "请求失败", err);
              reject(err);
            }
          });
        });
      },
      //发送消息（点击发送按钮）并接收消息
      sendMessage() {
        if (this.newMessage.trim() === "")
          return;
        const userMessage = this.newMessage.trim();
        formatAppLog("log", "at pages/chat/chat.vue:102", "发送信息", userMessage);
        this.messages.push({
          type: "send",
          content: userMessage
        });
        this.newMessage = "";
        this.receiveAnswer(userMessage).then((ans) => {
          formatAppLog("log", "at pages/chat/chat.vue:115", "收到回答", ans);
          this.receiveMessage(ans);
        }).catch((err) => {
          formatAppLog("error", "at pages/chat/chat.vue:120", "接收回答失败", err);
        });
      },
      //录音输入
      toggleVoiceInput() {
        this.isRecording = !this.isRecording;
        if (this.isRecording) {
          formatAppLog("log", "at pages/chat/chat.vue:129", "开始录音");
          recorderManager$2.start();
        } else {
          formatAppLog("log", "at pages/chat/chat.vue:133", "结束录音");
          recorderManager$2.stop();
        }
        const self = this;
        recorderManager$2.onStop(function(res) {
          formatAppLog("log", "at pages/chat/chat.vue:138", "recorder stop", res);
          self.voicePath = res.tempFilePath;
          if (self.voicePath) {
            uni.uploadFile({
              url: url_ask_voice$1,
              filePath: self.voicePath,
              name: "audio",
              success: function(res2) {
                const recognitionResult = res2.data;
                self.handleVoiceRecognition(recognitionResult);
              },
              fail: function(err) {
                formatAppLog("error", "at pages/chat/chat.vue:151", "语音识别请求失败", err);
              }
            });
          } else {
            formatAppLog("error", "at pages/chat/chat.vue:155", "没有录制的语音可用");
          }
          self.voicePath = "";
        });
      },
      //发送处理的录音结果
      handleVoiceRecognition(text) {
        if (text === "")
          return;
        const userMessage = text;
        formatAppLog("log", "at pages/chat/chat.vue:167", "发送信息", userMessage);
        this.messages.push({
          type: "send",
          content: userMessage
        });
        this.newMessage = "";
        this.receiveAnswer(userMessage).then((ans) => {
          formatAppLog("log", "at pages/chat/chat.vue:180", "收到回答", ans);
          this.receiveMessage(ans);
        }).catch((err) => {
          formatAppLog("error", "at pages/chat/chat.vue:185", "接收回答失败", err);
        });
      },
      //把聊天文字转化为语音
      chattovoice(message) {
        uni.request({
          url: url_send_text$1,
          method: "POST",
          header: {
            "Content-Type": "application/json"
          },
          data: {
            text: message.content
            // 发送消息内容到服务器
          },
          success: (res) => {
            formatAppLog("log", "at pages/chat/chat.vue:201", "文本已发送并处理成功");
          },
          fail: (err) => {
            formatAppLog("error", "at pages/chat/chat.vue:204", "请求失败", err);
          }
        });
        formatAppLog("log", "at pages/chat/chat.vue:207", "播放语音:", message.content);
        uni.downloadFile({
          url: url_download_audio$1,
          success: (res) => {
            if (res.statusCode === 200) {
              innerAudioContext$4.src = res.tempFilePath;
              innerAudioContext$4.play();
            } else {
              formatAppLog("error", "at pages/chat/chat.vue:216", "下载失败，请先上传文本", res);
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/chat/chat.vue:220", "下载音频文件失败", err);
          }
        });
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.goDetail && $options.goDetail(...args))
        }, "点击查看模型详情"),
        vue.createElementVNode("button", {
          onClick: _cache[1] || (_cache[1] = (...args) => $options.goVoiceChat && $options.goVoiceChat(...args))
        }, "切换到纯语音聊天"),
        vue.createElementVNode("view", { class: "chat-container" }, [
          vue.createElementVNode("scroll-view", {
            class: "chat-content",
            "scroll-y": ""
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.messages, (message, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  class: "message-item"
                }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["message", message.type])
                    },
                    [
                      vue.createTextVNode(
                        vue.toDisplayString(message.content) + " ",
                        1
                        /* TEXT */
                      ),
                      !$data.isRecording ? (vue.openBlock(), vue.createElementBlock("button", {
                        key: 0,
                        class: "voice-icon",
                        onClick: ($event) => $options.chattovoice(message)
                      }, [
                        vue.createElementVNode("image", {
                          src: "/static/chat/sound.png",
                          class: "icon"
                        })
                      ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                    ],
                    2
                    /* CLASS */
                  )
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          vue.createElementVNode("view", { class: "input-box" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                type: "text",
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.newMessage = $event),
                onConfirm: _cache[3] || (_cache[3] = (...args) => $options.sendMessage && $options.sendMessage(...args)),
                placeholder: "请输入消息"
              },
              null,
              544
              /* NEED_HYDRATION, NEED_PATCH */
            ), [
              [vue.vModelText, $data.newMessage]
            ]),
            vue.createElementVNode(
              "button",
              {
                onClick: _cache[4] || (_cache[4] = (...args) => $options.toggleVoiceInput && $options.toggleVoiceInput(...args)),
                class: "voice-btn"
              },
              vue.toDisplayString($options.voiceInputText),
              1
              /* TEXT */
            ),
            vue.createElementVNode("button", {
              onClick: _cache[5] || (_cache[5] = (...args) => $options.sendMessage && $options.sendMessage(...args)),
              class: "send-btn"
            }, "发送")
          ])
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesChatChat = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__file", "C:/Users/lenovo/Desktop/HBuilderX/Project/app/项目/pages/chat/chat.vue"]]);
  const _sfc_main$8 = {
    data() {
      return {
        userInfo: {
          avatarUrl: "/static/index/link_photo/photo1.png",
          userId: "2024000000",
          userName: "佚名"
        }
      };
    },
    methods: {
      goToTestPage() {
        uni.navigateTo({
          url: "/pages/test/test"
        });
      },
      goToSettings() {
        uni.navigateTo({
          url: "/pages/settings/settings"
        });
      },
      chooseAvatar() {
        uni.chooseImage({
          count: 1,
          success: (res) => {
            const tempFilePaths = res.tempFilePaths;
            this.userInfo.avatarUrl = tempFilePaths[0];
          }
        });
      },
      goToTempPage() {
        uni.navigateTo({
          url: "/pages/temp/temp"
        });
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(" 用户信息 "),
      vue.createElementVNode("view", { class: "user-info" }, [
        vue.createElementVNode("view", {
          class: "avatar-container",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.chooseAvatar && $options.chooseAvatar(...args))
        }, [
          vue.createElementVNode("image", {
            class: "avatar",
            src: $data.userInfo.avatarUrl,
            mode: "aspectFill"
          }, null, 8, ["src"])
        ]),
        vue.createElementVNode("view", { class: "user-detail" }, [
          vue.createElementVNode(
            "view",
            { class: "user-id" },
            "学号：" + vue.toDisplayString($data.userInfo.userId),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "view",
            { class: "user-name" },
            "姓名：" + vue.toDisplayString($data.userInfo.userName),
            1
            /* TEXT */
          )
        ])
      ]),
      vue.createCommentVNode(" 测试跳转界面 "),
      vue.createElementVNode("view", {
        class: "item test",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.goToTestPage && $options.goToTestPage(...args))
      }, [
        vue.createElementVNode("text", { class: "text" }, "测试"),
        vue.createElementVNode("view", { class: "arrow-container" }, [
          vue.createElementVNode("text", { class: "arrow" }, ">")
        ])
      ]),
      vue.createCommentVNode(" 跳转到temp页面 "),
      vue.createElementVNode("view", {
        class: "item temp",
        onClick: _cache[2] || (_cache[2] = (...args) => $options.goToTempPage && $options.goToTempPage(...args))
      }, [
        vue.createElementVNode("text", { class: "text" }, "Temp页面"),
        vue.createElementVNode("view", { class: "arrow-container" }, [
          vue.createElementVNode("text", { class: "arrow" }, ">")
        ])
      ]),
      vue.createCommentVNode(" 设置 "),
      vue.createElementVNode("view", {
        class: "setting",
        onClick: _cache[3] || (_cache[3] = (...args) => $options.goToSettings && $options.goToSettings(...args))
      }, [
        vue.createElementVNode("text", { class: "text" }, "设置"),
        vue.createElementVNode("view", { class: "arrow-container" }, [
          vue.createElementVNode("text", { class: "arrow" }, ">")
        ])
      ])
    ]);
  }
  const PagesMineMine = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__file", "C:/Users/lenovo/Desktop/HBuilderX/Project/app/项目/pages/mine/mine.vue"]]);
  const recorderManager$1 = uni.getRecorderManager();
  const innerAudioContext$3 = uni.createInnerAudioContext();
  const url_upload_audio = "http://10.21.198.127:8000/uploads/audio/audio";
  const _sfc_main$7 = {
    data() {
      return {
        voicePath: "",
        recognizedText: ""
        // 存储识别结果
      };
    },
    onLoad() {
      innerAudioContext$3.autoplay = true;
      const self = this;
      recorderManager$1.onStop(function(res) {
        formatAppLog("log", "at pages/test_vtt/test_vtt.vue:32", "recorder stop", res);
        self.voicePath = res.tempFilePath;
      });
    },
    methods: {
      startRecord() {
        formatAppLog("log", "at pages/test_vtt/test_vtt.vue:38", "开始录音");
        recorderManager$1.start();
      },
      endRecord() {
        formatAppLog("log", "at pages/test_vtt/test_vtt.vue:42", "录音结束");
        recorderManager$1.stop();
      },
      playVoice() {
        formatAppLog("log", "at pages/test_vtt/test_vtt.vue:46", "播放录音");
        if (this.voicePath) {
          innerAudioContext$3.src = this.voicePath;
          innerAudioContext$3.play();
        } else {
          formatAppLog("error", "at pages/test_vtt/test_vtt.vue:51", "No recorded audio available");
        }
      },
      uploadVoice() {
        formatAppLog("log", "at pages/test_vtt/test_vtt.vue:55", "上传录音");
        if (this.voicePath) {
          uni.uploadFile({
            url: url_upload_audio,
            filePath: this.voicePath,
            name: "audio",
            success: (res) => {
              formatAppLog("log", "at pages/test_vtt/test_vtt.vue:62", "Upload success", res);
            },
            fail: (err) => {
              formatAppLog("error", "at pages/test_vtt/test_vtt.vue:65", "Upload fail", err);
            }
          });
        } else {
          formatAppLog("error", "at pages/test_vtt/test_vtt.vue:69", "No recorded audio available");
        }
      },
      speechToText() {
        formatAppLog("log", "at pages/test_vtt/test_vtt.vue:73", "语音识别");
        if (this.voicePath) {
          const self = this;
          uni.uploadFile({
            url: url_upload_audio,
            filePath: this.voicePath,
            name: "audio",
            success: function(res) {
              self.recognizedText = res.data;
            },
            fail: function(err) {
              formatAppLog("error", "at pages/test_vtt/test_vtt.vue:85", "Speech to text request failed", err);
            }
          });
        } else {
          formatAppLog("error", "at pages/test_vtt/test_vtt.vue:89", "No recorded audio available");
        }
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "audioPlay" }, [
        vue.createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.startRecord && $options.startRecord(...args))
        }, "开始录音"),
        vue.createElementVNode("button", {
          onClick: _cache[1] || (_cache[1] = (...args) => $options.endRecord && $options.endRecord(...args))
        }, "停止录音"),
        vue.createElementVNode("button", {
          onClick: _cache[2] || (_cache[2] = (...args) => $options.playVoice && $options.playVoice(...args))
        }, "播放录音"),
        vue.createElementVNode("button", {
          onClick: _cache[3] || (_cache[3] = (...args) => $options.uploadVoice && $options.uploadVoice(...args))
        }, "上传录音"),
        vue.createElementVNode("button", {
          onClick: _cache[4] || (_cache[4] = (...args) => $options.speechToText && $options.speechToText(...args))
        }, "语音识别")
      ]),
      $data.recognizedText !== "" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "recognizedTextContainer"
      }, [
        vue.createElementVNode(
          "text",
          { class: "recognizedText" },
          vue.toDisplayString($data.recognizedText),
          1
          /* TEXT */
        ),
        vue.createCommentVNode(" 显示识别结果 ")
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesTest_vttTest_vtt = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-578b19ba"], ["__file", "C:/Users/lenovo/Desktop/HBuilderX/Project/app/项目/pages/test_vtt/test_vtt.vue"]]);
  const innerAudioContext$2 = uni.createInnerAudioContext();
  const _sfc_main$6 = {
    data() {
      return {
        inputText: "",
        // 用于存储输入的文本
        audioSrc: ""
        // 用于存储音频文件的URL
      };
    },
    onLoad() {
      innerAudioContext$2.autoplay = true;
    },
    methods: {
      submit() {
        uni.request({
          url: "http://10.21.198.127:8000/receive_text",
          method: "POST",
          header: {
            "Content-Type": "application/json"
          },
          data: {
            text: this.inputText
          },
          success: (res) => {
            formatAppLog("log", "at pages/test_ttv/test_ttv.vue:35", "文本已发送并处理成功");
          },
          fail: (err) => {
            formatAppLog("error", "at pages/test_ttv/test_ttv.vue:38", "请求失败", err);
          }
        });
      },
      downloadAndPlay() {
        uni.downloadFile({
          url: "http://10.21.198.127:8000/voice/voice.mp3",
          success: (res) => {
            if (res.statusCode === 200) {
              innerAudioContext$2.src = res.tempFilePath;
              innerAudioContext$2.play();
            } else {
              formatAppLog("error", "at pages/test_ttv/test_ttv.vue:51", "下载失败，请先上传文本", res);
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/test_ttv/test_ttv.vue:55", "下载音频文件失败", err);
          }
        });
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.withDirectives(vue.createElementVNode(
        "input",
        {
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.inputText = $event),
          type: "text",
          placeholder: "请输入文本"
        },
        null,
        512
        /* NEED_PATCH */
      ), [
        [vue.vModelText, $data.inputText]
      ]),
      vue.createElementVNode("button", {
        onClick: _cache[1] || (_cache[1] = (...args) => $options.submit && $options.submit(...args))
      }, "提交"),
      vue.createElementVNode("button", {
        onClick: _cache[2] || (_cache[2] = (...args) => $options.downloadAndPlay && $options.downloadAndPlay(...args))
      }, "下载并播放语音")
    ]);
  }
  const PagesTest_ttvTest_ttv = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__file", "C:/Users/lenovo/Desktop/HBuilderX/Project/app/项目/pages/test_ttv/test_ttv.vue"]]);
  const _sfc_main$5 = {
    methods: {
      goTextToSpeech() {
        uni.navigateTo({
          url: "/pages/test_ttv/test_ttv"
        });
      },
      goSpeechToText() {
        uni.navigateTo({
          url: "/pages/test_vtt/test_vtt"
        });
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("button", {
        onClick: _cache[0] || (_cache[0] = (...args) => $options.goTextToSpeech && $options.goTextToSpeech(...args))
      }, "文字转语音"),
      vue.createElementVNode("button", {
        onClick: _cache[1] || (_cache[1] = (...args) => $options.goSpeechToText && $options.goSpeechToText(...args))
      }, "语音转文字")
    ]);
  }
  const PagesTestTest = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-727d09f0"], ["__file", "C:/Users/lenovo/Desktop/HBuilderX/Project/app/项目/pages/test/test.vue"]]);
  const _sfc_main$4 = {
    data() {
      return {
        webUrl: ""
      };
    },
    onLoad(options) {
      this.webUrl = decodeURIComponent(options.url);
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "webview" }, [
      vue.createElementVNode("web-view", {
        src: $data.webUrl,
        mpcomid: "webview",
        "enable-back-forward": true
      }, null, 8, ["src"])
    ]);
  }
  const PagesWebviewWebview = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "C:/Users/lenovo/Desktop/HBuilderX/Project/app/项目/pages/webview/webview.vue"]]);
  const innerAudioContext$1 = uni.createInnerAudioContext();
  const _sfc_main$3 = {
    data() {
      return {
        ctx: null,
        isRecording: false,
        animationId: null,
        volume: 0,
        voicePath: ""
      };
    },
    onLoad() {
      innerAudioContext$1.autoplay = true;
    },
    onReady() {
      this.ctx = uni.createCanvasContext("myCanvas", this);
    },
    methods: {
      startRecording() {
        if (!this.isRecording) {
          formatAppLog("log", "at pages/temp/temp.vue:31", "Starting recording...");
          uni.getRecorderManager().start({
            success: () => {
              this.isRecording = true;
              this.drawSineWave();
              this.animationId = setInterval(this.getVolumeFromRecorder, 100);
            },
            fail: (err) => {
              formatAppLog("error", "at pages/temp/temp.vue:40", "Failed to start recording:", err);
            }
          });
        } else {
          formatAppLog("log", "at pages/temp/temp.vue:44", "Stopping recording...");
          uni.getRecorderManager().stop({
            success: (res) => {
              formatAppLog("log", "at pages/temp/temp.vue:47", "Stop recording success:", res);
              this.isRecording = false;
              clearInterval(this.animationId);
              this.clearCanvas();
            },
            fail: (err) => {
              formatAppLog("error", "at pages/temp/temp.vue:53", "Failed to stop recording:", err);
            }
          });
        }
      },
      getVolumeFromRecorder() {
        uni.getRecorderManager().onFrameRecorded((res) => {
          const frameBuffer = new Float32Array(res.frameBuffer);
          const volume = this.calculateVolume(frameBuffer);
          this.volume = volume;
          formatAppLog("log", "at pages/temp/temp.vue:63", "Volume:", volume);
          this.drawSineWave();
        });
      },
      calculateVolume(buffer) {
        let sum = 0;
        for (let i = 0; i < buffer.length; i++) {
          sum += buffer[i] * buffer[i];
        }
        const rms = Math.sqrt(sum / buffer.length);
        formatAppLog("log", "at pages/temp/temp.vue:73", "RMS:", rms);
        return rms;
      },
      drawSineWave() {
        const width = uni.upx2px(750);
        const height = uni.upx2px(200);
        let amplitude = this.volume * 50;
        const frequency = 0.02;
        const centerY = height / 2;
        let phase = 0;
        this.ctx.clearRect(0, 0, width, height);
        this.ctx.beginPath();
        this.ctx.moveTo(0, centerY);
        for (let x = 0; x < width; x++) {
          const y = amplitude * Math.sin(frequency * x + phase) + centerY;
          this.ctx.lineTo(x, y);
        }
        this.ctx.strokeStyle = "blue";
        this.ctx.stroke();
        this.ctx.draw(false);
        phase += 0.05;
      },
      clearCanvas() {
        const width = uni.upx2px(750);
        const height = uni.upx2px(200);
        this.ctx.clearRect(0, 0, width, height);
        this.ctx.draw();
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("canvas", {
          "canvas-id": "myCanvas",
          style: { "width": "100%", "height": "200rpx" }
        }),
        vue.createElementVNode(
          "button",
          {
            onTouchstart: _cache[0] || (_cache[0] = (...args) => $options.startRecording && $options.startRecording(...args))
          },
          vue.toDisplayString($data.isRecording ? "停止录音" : "开始录音"),
          33
          /* TEXT, NEED_HYDRATION */
        )
      ])
    ]);
  }
  const PagesTempTemp = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "C:/Users/lenovo/Desktop/HBuilderX/Project/app/项目/pages/temp/temp.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {
        modelSizes: [
          { 尺寸: "微型", 参数: "39 M", "所需VRAM": "~1 GB", "速度": "~32x" },
          { 尺寸: "基本", 参数: "74 M", "所需VRAM": "~1 GB", "速度": "~16x" },
          { 尺寸: "小型", 参数: "244 M", "所需VRAM": "~2 GB", "速度": "~6x" },
          { 尺寸: "中型", 参数: "769 M", "所需VRAM": "~5 GB", "速度": "~2x" },
          { 尺寸: "大型", 参数: "1550 M", "所需VRAM": "~10 GB", "速度": "1x" }
        ]
      };
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", null, [
      vue.createElementVNode("view", { class: "table" }, [
        vue.createElementVNode("view", { class: "row header" }, [
          vue.createElementVNode("view", { class: "cell" }, "尺寸"),
          vue.createElementVNode("view", { class: "cell" }, "参数"),
          vue.createElementVNode("view", { class: "cell" }, "所需VRAM"),
          vue.createElementVNode("view", { class: "cell" }, "速度")
        ]),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.modelSizes, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: index,
              class: "row"
            }, [
              vue.createElementVNode(
                "view",
                { class: "cell" },
                vue.toDisplayString(item.尺寸),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "cell" },
                vue.toDisplayString(item.参数),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "cell" },
                vue.toDisplayString(item["所需VRAM"]),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "cell" },
                vue.toDisplayString(item["速度"]),
                1
                /* TEXT */
              )
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createElementVNode("div", { class: "info" }, [
        vue.createElementVNode("p", null, "1、本语音识别app采用OPENAI开源的whisper模型，模型参数如上。"),
        vue.createElementVNode("p", null, "2、当前模型为基本，如果你想切换模型，请用文本输入：“切换模型”+“模型尺寸”"),
        vue.createElementVNode("p", null, [
          vue.createTextVNode("3、该模型详情链接："),
          vue.createElementVNode("a", {
            href: "https://github.com/openai/whisper",
            target: "_blank"
          }, "https://github.com/openai/whisper")
        ])
      ])
    ]);
  }
  const PagesDetailDetail = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "C:/Users/lenovo/Desktop/HBuilderX/Project/app/项目/pages/detail/detail.vue"]]);
  const recorderManager = uni.getRecorderManager();
  const innerAudioContext = uni.createInnerAudioContext();
  const url_ask_voice = "http://10.21.198.127:8000/history/ask/voice";
  const url_send_text = "http://10.21.198.127:8000/change/text";
  const url_download_audio = "http://10.21.198.127:8000/change/voice/voice.mp3";
  const url_ask_text = "http://10.21.198.127:8000/history/ask/text";
  const _sfc_main$1 = {
    data() {
      return {
        messages: [],
        // 存储聊天消息
        newMessage: "",
        // 当前输入的消息
        isRecording: false,
        // 是否正在录音
        voicePath: "",
        // 存储语音文件路径
        showRecording: false,
        showRecognizing: false,
        showSpeaking: false,
        errReciving: false
      };
    },
    onLoad() {
      innerAudioContext.autoplay = true;
      const self = this;
      recorderManager.onStop(function(res) {
        formatAppLog("log", "at pages/voiceChat/voiceChat.vue:38", "recorder stop", res);
        self.voicePath = res.tempFilePath;
      });
    },
    computed: {
      voiceInputText() {
        return this.isRecording ? "录音中" : "语音";
      }
    },
    methods: {
      stopAudioPlayback() {
        if (innerAudioContext && innerAudioContext.paused === false) {
          innerAudioContext.stop();
        }
      },
      receiveAnswer(text) {
        return new Promise((resolve, reject) => {
          uni.request({
            url: url_ask_text,
            method: "POST",
            header: {
              "Content-Type": "application/json"
            },
            data: {
              text
              // 发送消息内容到服务器
            },
            success: (res) => {
              formatAppLog("log", "at pages/voiceChat/voiceChat.vue:65", "文本已发送到服务器");
              const ans = res.data;
              resolve(ans);
            },
            fail: (err) => {
              formatAppLog("error", "at pages/voiceChat/voiceChat.vue:70", "请求失败", err);
              reject(err);
            }
          });
        });
      },
      //发送消息（点击发送按钮）并接收消息
      sendMessage() {
        if (this.newMessage.trim() === "")
          return;
        const userMessage = this.newMessage.trim();
        formatAppLog("log", "at pages/voiceChat/voiceChat.vue:81", "发送信息", userMessage);
        this.messages.push({
          type: "send",
          content: userMessage
        });
        this.receiveAnswer(userMessage).then((ans) => {
          formatAppLog("log", "at pages/voiceChat/voiceChat.vue:91", "收到回答", ans);
        }).catch((err) => {
          formatAppLog("error", "at pages/voiceChat/voiceChat.vue:95", "接收回答失败", err);
        });
      },
      //录音输入
      toggleVoiceInput() {
        this.isRecording = !this.isRecording;
        if (this.isRecording) {
          formatAppLog("log", "at pages/voiceChat/voiceChat.vue:104", "开始录音");
          recorderManager.start();
          this.showRecording = true;
          this.showRecognizing = false;
          this.showSpeaking = false;
          this.errReciving = false;
        } else {
          formatAppLog("log", "at pages/voiceChat/voiceChat.vue:112", "结束录音");
          recorderManager.stop();
          this.showRecording = false;
          this.showRecognizing = true;
          this.showSpeaking = false;
          this.errReciving = false;
        }
        const self = this;
        recorderManager.onStop(function(res) {
          formatAppLog("log", "at pages/voiceChat/voiceChat.vue:121", "recorder stop", res);
          self.voicePath = res.tempFilePath;
          if (self.voicePath) {
            uni.uploadFile({
              url: url_ask_voice,
              filePath: self.voicePath,
              name: "audio",
              success: function(res2) {
                const recognitionResult = res2.data;
                self.handleVoiceRecognition(recognitionResult);
              },
              fail: function(err) {
                formatAppLog("error", "at pages/voiceChat/voiceChat.vue:134", "语音识别请求失败", err);
              }
            });
          } else {
            formatAppLog("error", "at pages/voiceChat/voiceChat.vue:138", "没有录制的语音可用");
          }
          self.voicePath = "";
        });
      },
      //发送处理的录音结果
      handleVoiceRecognition(text) {
        if (text === "")
          return;
        const userMessage = text;
        formatAppLog("log", "at pages/voiceChat/voiceChat.vue:150", "发送信息", userMessage);
        this.receiveAnswer(userMessage).then((ans) => {
          formatAppLog("log", "at pages/voiceChat/voiceChat.vue:155", "收到回答", ans);
          this.chattovoice(ans);
        }).catch((err) => {
          formatAppLog("error", "at pages/voiceChat/voiceChat.vue:159", "接收回答失败", err);
          this.showRecording = false;
          this.showRecognizing = false;
          this.showSpeaking = false;
          this.errReciving = true;
        });
      },
      //把聊天文字转化为语音
      chattovoice(message) {
        uni.request({
          url: url_send_text,
          method: "POST",
          header: {
            "Content-Type": "application/json"
          },
          data: {
            text: message
            // 发送消息内容到服务器
          },
          success: (res) => {
            formatAppLog("log", "at pages/voiceChat/voiceChat.vue:179", "文本已发送并处理成功");
          },
          fail: (err) => {
            formatAppLog("error", "at pages/voiceChat/voiceChat.vue:182", "请求失败", err);
          }
        });
        formatAppLog("log", "at pages/voiceChat/voiceChat.vue:185", "播放语音:", message.content);
        uni.downloadFile({
          url: url_download_audio,
          success: (res) => {
            if (res.statusCode === 200) {
              formatAppLog("log", "at pages/voiceChat/voiceChat.vue:192", "下载成功");
              innerAudioContext.src = res.tempFilePath;
              this.showRecording = false;
              this.showRecognizing = false;
              this.showSpeaking = true;
              this.errReciving = false;
              innerAudioContext.play();
              innerAudioContext.onEnded(() => {
                this.showRecording = false;
                this.showRecognizing = false;
                this.showSpeaking = false;
                this.errReciving = false;
              });
            } else {
              formatAppLog("error", "at pages/voiceChat/voiceChat.vue:207", "下载失败，请先上传文本", res);
              this.showRecording = false;
              this.showRecognizing = false;
              this.showSpeaking = false;
              this.errReciving = true;
            }
          },
          fail: (err) => {
            formatAppLog("error", "at pages/voiceChat/voiceChat.vue:216", "下载音频文件失败", err);
            this.showRecording = false;
            this.showRecognizing = false;
            this.showSpeaking = false;
            this.errReciving = true;
          }
        });
      },
      onUnload() {
        this.stopAudioPlayback();
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode(
          "button",
          {
            onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleVoiceInput && $options.toggleVoiceInput(...args)),
            class: "voice-btn"
          },
          vue.toDisplayString($options.voiceInputText),
          1
          /* TEXT */
        ),
        $data.showRecording ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "recording-animation",
          src: "/static/recording_speaking/recording.gif"
        })) : vue.createCommentVNode("v-if", true),
        $data.showRecognizing ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 1,
          class: "recognizing-animation",
          src: "/static/recording_speaking/recognizing.gif"
        })) : vue.createCommentVNode("v-if", true),
        $data.showSpeaking ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 2,
          class: "speaking-animation",
          src: "/static/recording_speaking/speaking.gif"
        })) : vue.createCommentVNode("v-if", true),
        $data.errReciving ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 3,
          class: "err-animation",
          src: "/static/chat/logo.png"
        })) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(' <view class="test-text">测试文本</view> ')
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesVoiceChatVoiceChat = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "C:/Users/lenovo/Desktop/HBuilderX/Project/app/项目/pages/voiceChat/voiceChat.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/chat/chat", PagesChatChat);
  __definePage("pages/mine/mine", PagesMineMine);
  __definePage("pages/test_vtt/test_vtt", PagesTest_vttTest_vtt);
  __definePage("pages/test_ttv/test_ttv", PagesTest_ttvTest_ttv);
  __definePage("pages/test/test", PagesTestTest);
  __definePage("pages/webview/webview", PagesWebviewWebview);
  __definePage("pages/temp/temp", PagesTempTemp);
  __definePage("pages/detail/detail", PagesDetailDetail);
  __definePage("pages/voiceChat/voiceChat", PagesVoiceChatVoiceChat);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/Users/lenovo/Desktop/HBuilderX/Project/app/项目/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
