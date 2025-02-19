/*
 * Copyright 2017 WalmartLabs

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "ElectrodePluginConfig.h"




NS_ASSUME_NONNULL_BEGIN

@interface ElectrodeContainerConfig: NSObject <ElectrodePluginConfig>
@property (nonatomic, assign) BOOL debugEnabled;
@property (nonatomic, copy) NSString *packagerHost;
@property (nonatomic, copy) NSString *packagerPort;
@end

////////////////////////////////////////////////////////////////////////////////
#pragma mark - ElectrodeReactNative
/**
 Container for Electrode plugins and React Native bundles that isolates
 logic, files and set up from Native engineers.
 */
@interface ElectrodeReactNative : NSObject

/**
 Create a singleton instance of ElectrodeReactNative with the ability to set
 configurations for the plugins associated with the container.

 @return A singleton instance of ElectrodeReactNative.
 */
+ (instancetype)sharedInstance;

/**
 Start an instance of ElectrodeReactNative with the ability to set
 configurations for the plugins associated with the container. Only needed to be
 called once.

 @param reactContainerConfig NSDictionary that uses ERN keys such as ERNCodePushConfig
 to store NSDictionary of configurations. The main key signifies which plugin
 the configuration is for, the subsequent NSDictionary is the actual
 configuration. This allows the ability to pass in multiple configurations for
 multiple plugins.
 */

+ (void)startWithConfigurations:(id<ElectrodePluginConfig>)reactContainerConfig
;


/**
 Returns a react native miniapp (from a JSBundle) inside a view controller.

 @param name The name of the mini app, preferably the same name as the jsbundle
 without the extension.
 @param properties Any configuration to set up the mini app with.
 @return A UIViewController containing the view of the miniapp.
 */
- (UIViewController *)miniAppWithName:(NSString *)name
                           properties:(NSDictionary * _Nullable)properties;

/**
 Returns a react native miniapp (from a JSBundle) inside a view controller.

 @param name The name of the mini app, preferably the same name as the jsbundle
 without the extension.
 @param properties Any configuration to set up the mini app with.
 @return A UIViewController containing the view of the miniapp.
 */
- (UIView *)miniAppViewWithName:(NSString *)name
                     properties:(NSDictionary *_Nullable)properties;

/**
 @param name The name of the mini app, that is registered with the AppComponent.
 @param properties initialprops for a React Native miniapp.
 @param sizeFlexibilty defines size flexibility type of the root view
 @return UIView
 */
- (UIView *)miniAppViewWithName:(NSString *)name properties:(NSDictionary *_Nullable)properties sizeFlexibility:(NSInteger)sizeFlexibilty;

/**
 Call this to update an RCTRootView with new props. Calling this with new props will cause the view to be rerendered.
 Request will be ignored if the returned view is not an RCTRootView instance.
 */
- (void)updateView:(UIView *)view withProps:(NSDictionary *)newProps;

@end
NS_ASSUME_NONNULL_END
